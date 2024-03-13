import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgClass} from "@angular/common";
import { BooleanService} from '../../services/global-state.service';
import {Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {SignIn} from "../../store/actions/user.actions";
import {isUserDataAvailable, selectCurrentUser} from "../../store/selectors/user.selector";
import {Observable} from "rxjs";
import {IUser} from "../../store/state/user.state";
import * as UserActions from "../../store/actions/user.actions";
import {IAppState} from "../../store";

@Component({
  selector: 'signIn',
  standalone: true,
  imports: [
    NgClass,
    AsyncPipe
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit{
  booleanValue!: boolean;
  isGood = false;
  password!: string;
  email: string = '';

  isUserDataAvailable$: Observable<boolean>;
  constructor(private router: Router, private store: Store<IAppState>) {
    this.isUserDataAvailable$ = this.store.select(isUserDataAvailable);
  }
  onEmailChange = (event: any) => {
    this.email = (event.target as HTMLInputElement).value;
  }
  onPasswordChange = (event: any) => {
    this.password = (event.target as HTMLInputElement).value;
  }

  ngOnInit() {
    this.isUserDataAvailable$ = this.store.pipe(select(isUserDataAvailable));
  }
  check = () => {
    this.store.dispatch(SignIn({ email: this.email, password: this.password }));

    this.isUserDataAvailable$.subscribe((userDataAvailable: boolean) => {
      if (userDataAvailable) {
        this.isGood = !this.isGood
        this.router.navigate(['/profile'])
      } else {

      }
    });

  }
}
