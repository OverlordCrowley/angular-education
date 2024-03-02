import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'colorTextPipe',
  standalone: true
})
export class ColorTextPipe implements PipeTransform {

  constructor(private _sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    function isPrimeNumber(num: number): boolean | void {
      if (Number.isInteger(num)){
        if ((num % 2 === 0 || num % 3 === 0) &&
          num > 0 &&
          num !== 2 && num !== 3 && num !== 1) {
          return false;
        }
        else return true;
      }
    }

    function hasSpecialChars(text: string): boolean {
      const regex = /[!@#$%^&*(),.?":{}|<>]/;
      return regex.test(text);
    }

    let result = '';

    if (hasSpecialChars(value)) {
      result = `<span style="color: red;">${value}(красный)</span>`;
    } else if (isPrimeNumber(Number(value))) {
      result = `<span style="color: blue;">${value}(синий)</span>`;
    } else {
      result = `<span style="color: green;">${value}(зеленый)</span>`;
    }

    return this._sanitizer.bypassSecurityTrustHtml(result);
  }

}
