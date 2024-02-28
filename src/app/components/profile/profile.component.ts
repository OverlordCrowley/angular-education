import { Component } from '@angular/core';
import {getUser} from "../https/user";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  name: string;
  email: string;
  getProfile = () =>{
    let res = getUser();
    res
  }
}
