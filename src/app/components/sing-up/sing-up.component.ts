import { Component } from '@angular/core';
import {signUp} from "../https/user";
import {NgClass} from "@angular/common";

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
  password: string = '';
  email: string = '';
  name: string = '';


  constructor() {
  }

  check = () =>{
    signUp(this.name,this.email, this.password).then((r: any) => {
      this.isGood = true;
      return r;
    })
  }

}
