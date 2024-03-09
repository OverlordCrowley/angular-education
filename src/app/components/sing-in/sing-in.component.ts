import {Component, OnInit} from '@angular/core';
import {NgClass} from "@angular/common";
import {getUser, singIn} from "../https/user";
import { BooleanService} from '../../services/global-state.service';
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {setUser} from "../../store/actions/user.actions";


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

  constructor(private booleanService: BooleanService, private router: Router, private store: Store) {}
  onEmailChange = (event: any) => {
    this.email = (event.target as HTMLInputElement).value;
  }
  onPasswordChange = (event: any) => {
    this.password = (event.target as HTMLInputElement).value;
  }


  check = () => {
    singIn(this.email, this.password).then((r: any) => {
      this.isGood = true;
      this.store.dispatch(setUser({ payload: r.data.user }));
      localStorage.setItem('user', JSON.stringify(r.data.user));
      this.booleanService.setBooleanValue(true);
      this.router.navigate(['/profile'])
      return r;
    })

  }

  ngOnInit(): void {
  }

}
