import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'Header',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class Header {
   isActive: boolean = false;


   logOut = () =>{

   }
}
