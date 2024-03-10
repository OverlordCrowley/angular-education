import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {NgClass, NgIf} from "@angular/common";
import {BooleanService} from "../../services/global-state.service";
import {Observable, Subscription} from "rxjs";
import {select, Store} from "@ngrx/store";
import {IUser} from "../../store/state/user.state";
import {isUserDataAvailable, selectCurrentUser} from "../../store/selectors/user.selector";
import {LogOut} from "../../store/actions/user.actions";
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
export class HeaderComponent {
   isActive: boolean = false;
  booleanValue: boolean;
  valueSubscription: Subscription;
  private isUserDataAvailable$: Observable<boolean>;
  constructor(private router: Router, private booleanService: BooleanService, private store : Store) {
    this.booleanValue = false;

    this.isUserDataAvailable$ = this.store.pipe(select(isUserDataAvailable));

    // this.store.dispatch(new GetUser());
    this.valueSubscription = this.booleanService.booleanValue$.subscribe((value : boolean) => {
      this.booleanValue = value;
    });
     // if(user){
     //   this.isActive = true;
     //   this.booleanValue = true;
     //   this.router.navigate(['/profile'])
     // }
     // else{
     //   this.booleanValue = false;
     //   this.router.navigate(['/signIn'])
     // }


   }

   exit = () =>{
     this.store.dispatch(LogOut());
     this.booleanValue = false;
     this.isActive = false;
     this.booleanService.setBooleanValue(false);
     this.router.navigate(['/signIn'])
  }


}
