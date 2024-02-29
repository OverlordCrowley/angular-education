import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
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

   constructor(private router: Router) {
     let user = getUser();
     if(user){
       this.isActive = true;
       this.router.navigate(['/profile'])
     }
     this.router.navigate(['/signIn'])


   }

   exit = () =>{
     logOut();
     this.router.navigate(['/signIn'])
  }


}
