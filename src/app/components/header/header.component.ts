import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {getUser, logOut} from "../https/user";
import {NgClass} from "@angular/common";

@Component({
  selector: 'Header',
  standalone: true,
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
   isActive: boolean = false;

   constructor() {
     let user = getUser();
     if(user){
       this.isActive = true;
     }
   }

   exit = () =>{
     logOut();
  }


}
