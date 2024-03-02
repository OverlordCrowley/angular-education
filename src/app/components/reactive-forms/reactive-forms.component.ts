import {Component, OnInit} from '@angular/core';
import {ColorTextPipe} from "../../pipes/color-text-pipe.pipe";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-reactive-forms',
  standalone: true,
  imports: [
    ColorTextPipe,
    NgClass,
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './reactive-forms.component.html',
  styleUrl: './reactive-forms.component.scss'
})
export class ReactiveFormsComponent implements OnInit{
  inputValue: string = '';
  isEmpty: boolean = true;
  inputError: boolean = false;
  isPrime: boolean;
  isSelected: boolean = false;
  isSymbol: boolean = false;
  items: string[] = [];
  message: string = '';

  registerForm = this.fb.group({
    colorInput: ''
  })
  constructor(private fb: FormBuilder) {
    this.isPrime = false;
  }

  ngOnInit() {
    this.registerForm.get('colorInput')?.valueChanges.subscribe((value: string | null)=>{
      if(value == ""){
        this.isEmpty = true;
      }
      this.isEmpty = false;


      if(/[!@#$%^&*(),.?":{}|<>]/.test(String(value))){
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
    })
  }


  saveValue(): void {
    let value = String(this.registerForm.get('colorInput')?.value);
    if (!this.inputError) {
      this.items.push(value);
      this.inputValue = '';
      console.log(this.inputValue)
      this.isEmpty = true;
    }
  }

}
