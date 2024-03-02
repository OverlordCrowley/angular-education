import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-task-for-directives',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    NgForOf
  ],
  templateUrl: './task-for-directives.component.html',
  styleUrl: './task-for-directives.component.css'
})
export class TaskForDirectivesComponent {
  inputValue: string = '';
  isEmpty: boolean = true;
  inputError: boolean = false;
  isPrime: boolean = false;
  isSymbol: boolean = false;
  items: string[] = [];
  message: string = '';

  constructor() {}

  validateInput(value: string): void {
    if(value !== ""){
      this.isEmpty = false;
    }
    else{
      this.isEmpty = true;
    }
    this.inputError = /[^\w\d]/.test(value);
  }


  saveValue(value: string): void {
    if (!this.inputError) {
      this.items.push(value);
      this.inputValue = '';
    }
  }
}
