import { Component } from '@angular/core';
import {NgClass} from "@angular/common";
import {singIn} from "../https/user";

@Component({
  selector: 'signIn',
  standalone: true,
  imports: [
    NgClass

  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  isGood: boolean = false;
  password: string = '';
  email: string = '';


  constructor() {
  }

  check = () =>{
    singIn(this.email, this.password).then((r: any) => {
      this.isGood = true;
      return r;
    })

  }
}
