import {Component, OnInit} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {BooleanService} from "../../services/global-state.service";
import {ToggleListComponent} from "../toggle-list/toggle-list.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {IUser} from "../../store/state/user.state";
import {isUserDataAvailable, selectCurrentUser} from "../../store/selectors/user.selector";
import {SignIn, SignUp} from "../../store/actions/user.actions";

@Component({
  selector: 'app-sing-up',
  standalone: true,
  imports: [
    NgClass,
    ToggleListComponent,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.scss'
})
export class SingUpComponent implements OnInit {
  isGood = false;
  hobbies: string[];
  register!: FormGroup;
  isUserDataAvailable$: Observable<boolean>;

  constructor(private router: Router, private fb: FormBuilder, private store: Store,) {
  this.hobbies = [];
  this.isUserDataAvailable$ = this.store.select(isUserDataAvailable);
  }

  ngOnInit() {
    this.register = this.fb.group({
      Name: ['', [Validators.required, Validators.pattern(/^[A-Za-z-]+$/)]],
      FirstName: ['', [Validators.required, Validators.pattern(/^[A-Za-z-]+$/)]],
      Phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]+$/)]],
      Email: ['', [Validators.required, Validators.email]],
      Pass: ['', [Validators.required ]]
    });
    this.isUserDataAvailable$ = this.store.pipe(select(isUserDataAvailable));
  }


  receiveMessage(message: any) {
    this.hobbies = message
  }

  check = () =>{

    this.store.dispatch(SignUp({ name: this.register.get("Name")?.value,
      email: this.register.get("Email")?.value, password: this.register.get("Pass")?.value,
      lastName: this.register.get("FirstName")?.value, hobbies: this.hobbies,
      phone: this.register.get("Phone")?.value}));

    this.isUserDataAvailable$.subscribe((userDataAvailable: boolean) => {
      if (userDataAvailable) {
        this.isGood = !this.isGood
        this.router.navigate(['/profile'])
      } else {

      }
    });

  }
}
