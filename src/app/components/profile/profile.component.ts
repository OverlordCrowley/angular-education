import { Component } from '@angular/core';
import {getUser} from "../https/user";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  name: string;
  email: string;
  getProfile = () =>{
    let res = getUser();
    console.log(res)
  }
  constructor() {
    this.name = '';
    this.email = '';
  }
}
