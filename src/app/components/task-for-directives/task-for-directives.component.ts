import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {NgClass} from "@angular/common";
import {ColorTextPipe} from "../../pipes/color-text-pipe.pipe";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-task-for-directives',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    FormsModule,
    NgForOf,
    ColorTextPipe
  ],
  templateUrl: './task-for-directives.component.html',
  styleUrl: './task-for-directives.component.scss'
})
export class TaskForDirectivesComponent {
  inputValue: string = '';
  isEmpty: boolean = true;
  inputError: boolean = false;
  isPrime: boolean;
  isSelected: boolean = false;
  isSymbol: boolean = false;
  items: string[] = [];
  message: string = '';

  constructor() {
    this.isPrime = false;
  }

  validateInput(value: string): void {
    if(value == ""){
      this.isEmpty = true;
    }
    this.isEmpty = false;


    if(/[!@#$%^&*(),.?":{}|<>]/.test(value)
    ){
      this.isSymbol = true;
      this.message = 'Вы ввели символ';
      this.isSelected = true;

    }

    else{
      let numberValue = Number(value);
      if(Number.isInteger(numberValue)){
        this.isSelected = false;
        if ((numberValue % 2 === 0 || numberValue % 3 === 0) &&
          numberValue > 0 &&
          numberValue !== 2 && numberValue !== 3 && numberValue !== 1) {
          this.isPrime = false;
          this.message = 'Вы ввели составное число';
        }

        else {
          this.isPrime = true;
          this.message = 'Вы ввели простое число';
        }
      }
    }


  }


  saveValue(value: string): void {
    if (!this.inputError) {
      this.items.push(value);
      this.inputValue = '';
      console.log(this.inputValue)
      this.isEmpty = true;
    }
  }
}
