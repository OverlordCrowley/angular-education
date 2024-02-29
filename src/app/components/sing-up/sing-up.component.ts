import { Component } from '@angular/core';
import {signUp} from "../https/user";
import {NgClass} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sing-up',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.scss'
})
export class SingUpComponent {
  isGood: boolean = false;
  password: string;
  email: string;
  name: string;


  constructor(private router: Router) {
    this.password = '';
    this.email = '';
    this.name = '';
  }
  onNameChange = (event: any) => {
    this.name = (event.target as HTMLInputElement).value;
  }
  onEmailChange = (event: any) => {
    this.email = (event.target as HTMLInputElement).value;
  }
  onPasswordChange = (event: any) => {
    this.password = (event.target as HTMLInputElement).value;
  }


  check = () =>{
    signUp(this.name,this.email, this.password).then((r: any) => {
      localStorage.setItem('user', JSON.stringify(r.user));
      this.router.navigate(['/profile'])
    })
  }

}
