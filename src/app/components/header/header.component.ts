import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {NgClass, NgIf} from "@angular/common";
import {BooleanService} from "../../services/global-state.service";
import {Observable, Subscription} from "rxjs";
import {select, Store} from "@ngrx/store";
import {IUser} from "../../store/state/user.state";
import {isUserDataAvailable, selectCurrentUser} from "../../store/selectors/user.selector";
import {LogOut, SignIn} from "../../store/actions/user.actions";
@Component({
  selector: 'Header',
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
   isActive: boolean = false;
   isUserDataAvailable$: Observable<boolean>;
   isUser$: boolean;
    booleanValue = false;

  constructor(private router: Router, private booleanService: BooleanService, private store : Store) {

    this.isUserDataAvailable$ = this.store.select(isUserDataAvailable);

    let user = localStorage.getItem('user')
    this.isUser$ = !!user;

    if(this.isUser$){
      this.isActive = true;
      this.booleanValue = true;
      this.router.navigate(['/profile'])
    }
    else{
      console.log('aaaa')
      this.isActive = false;
      this.booleanValue = false;
      this.router.navigate(['/signIn'])
    }

    this.isUserDataAvailable$ = this.store.pipe(select(isUserDataAvailable));
    this.isUserDataAvailable$.subscribe((userDataAvailable: boolean) => {
    if (!userDataAvailable && !this.isUser$) {
        this.isActive = false;
        this.booleanValue = false;
      }
    else{
      this.isActive = true;
      this.booleanValue = true;
    }
    });




   }

   ngOnInit(){
     // this.isUserDataAvailable$ = this.store.pipe(select(isUserDataAvailable));
     // this.isUserDataAvailable$.subscribe((userDataAvailable: boolean) => {
     // if (!this.isUser$ || !userDataAvailable) {
     //     this.isActive = false;
     //     this.booleanValue = false;
     //     this.router.navigate(['/signIn']);
     //   }
     // });
   }

   exit = () =>{
     this.store.dispatch(LogOut());
     localStorage.setItem('user','')
     this.booleanValue = false;
     this.isActive = false;
     this.router.navigate(['/signIn'])
  }


}
