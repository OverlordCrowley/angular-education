import {Component, OnInit} from '@angular/core';
import {NgClass} from "@angular/common";
import {singIn} from "../https/user";
import { BooleanService} from '../../global-state.service';


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
  booleanValue: boolean;

  password!: string;
  email: string = '';

  constructor(private booleanService: BooleanService) {}

  ngOnInit(): void {
    this.booleanService.getBooleanValue().subscribe(value => {
      this.booleanValue = value;
    });
  }

  check = () => {
    singIn(this.email, this.password).then((r: any) => {
      this.isGood = true;
      return r;
    })
  }

}
