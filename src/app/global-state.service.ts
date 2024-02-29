import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooleanService {
  private booleanValueSubject: BehaviorSubject<boolean>;
  booleanValue$: Observable<boolean>;

  constructor() {
    this.booleanValueSubject = new BehaviorSubject<boolean>(false);
    this.booleanValue$ = this.booleanValueSubject.asObservable();
  }


  setBooleanValue(newValue: boolean): void {
    this.booleanValueSubject.next(newValue);
  }

  getBooleanValue(): Observable<boolean> {
    return this.booleanValueSubject;
  }
}
