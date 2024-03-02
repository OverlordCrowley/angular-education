import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {getUser, logOut} from "../https/user";
import {NgClass, NgIf} from "@angular/common";
import {BooleanService} from "../../services/global-state.service";
import {Subscription} from "rxjs";
@Component({
  selector: 'Header',
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
   isActive: boolean = false;
  booleanValue: boolean;
  valueSubscription: Subscription;

  constructor(private router: Router, private booleanService: BooleanService) {
    let user = getUser();
    this.valueSubscription = this.booleanService.booleanValue$.subscribe((value : boolean) => {
      this.booleanValue = value;
    });
     if(user){
       this.isActive = true;
       this.booleanValue = true;
       this.router.navigate(['/profile'])
     }
     else{
       this.booleanValue = false;
       this.router.navigate(['/signIn'])
     }


   }

   exit = () =>{
     logOut();
     this.booleanValue = false;
     this.isActive = false;
     this.booleanService.setBooleanValue(false);
     this.router.navigate(['/signIn'])
  }


}
