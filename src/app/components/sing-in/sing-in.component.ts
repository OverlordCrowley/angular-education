import {Component, OnInit} from '@angular/core';
import {NgClass} from "@angular/common";
import { BooleanService} from '../../services/global-state.service';
import {Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {SignIn} from "../../store/actions/user.actions";
import {selectCurrentUser} from "../../store/selectors/user.selector";
import {Observable} from "rxjs";
import {IUser} from "../../store/state/user.state";
import * as UserActions from "../../store/actions/user.actions";

@Component({
  selector: 'signIn',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit{
  isGood: boolean = false;
  booleanValue!: boolean;

  password!: string;
  email: string = '';

  currentUser$: any;

  constructor(private booleanService: BooleanService, private router: Router, private store: Store) {
    this.currentUser$ = this.store.select(selectCurrentUser)
  }
  onEmailChange = (event: any) => {
    this.email = (event.target as HTMLInputElement).value;
  }
  onPasswordChange = (event: any) => {
    this.password = (event.target as HTMLInputElement).value;
  }


  check = () => {
    this.store.dispatch(UserActions.SignIn({email: this.email, password: this.password }));
    // this.currentUser$ = this.store.pipe(select(selectCurrentUser));
    // console.log(this.currentUser$.pass)
    // console.log(this.store.pipe(select(selectCurrentUser)));

    // singIn(this.email, this.password).then((r: any) => {
    //   this.isGood = true;
    //   localStorage.setItem('user', JSON.stringify(r.data.user));
    //   this.booleanService.setBooleanValue(true);
    //   this.router.navigate(['/profile'])
    //   return r;
    // })

  }

  ngOnInit() {
  }

}
