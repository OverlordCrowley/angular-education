import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {getUser} from "../components/https/user";

@Injectable({
  providedIn: 'root'
})
export class BooleanService {
  private _booleanValue = new Subject<boolean>();
  booleanValue$ = this._booleanValue.asObservable();

  constructor() {
  }

  setBooleanValue(newValue: boolean) {
    this._booleanValue.next(newValue);
  }
}
