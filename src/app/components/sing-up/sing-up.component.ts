import {Component, OnInit} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {BooleanService} from "../../services/global-state.service";
import {ToggleListComponent} from "../toggle-list/toggle-list.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {SignIn} from "../../store/actions/user.actions";

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

  hobbies: string[];
  register!: FormGroup;

  constructor(private router: Router, private booleanService: BooleanService, private fb: FormBuilder, private store: Store) {
  this.hobbies = [];
  }

  ngOnInit() {
    this.register = this.fb.group({
      Name: ['', [Validators.required, Validators.pattern(/^[A-Za-z-]+$/)]],
      FirstName: ['', [Validators.required, Validators.pattern(/^[A-Za-z-]+$/)]],
      Phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]+$/)]],
      Email: ['', [Validators.required, Validators.email]],
      Pass: ['', [Validators.required ]]
    });
  }


  receiveMessage(message: any) {
    this.hobbies = message
  }

  check = () =>{

    // this.store.dispatch(SignIn({ email, password }));
    //
    // signUp(
    //   String(this.register.get("Name")?.value), this.register.get("Email")?.value,
    //   this.register.get("Pass")?.value, this.register.get("FirstName")?.value,
    //   this.hobbies, this.register.get("Phone")?.value
    // ).then((r: any) => {
    //   // this.store.dispatch(new SetUser( r.data.user ));
    //   this.booleanService.setBooleanValue(true);
    //   this.router.navigate(['/profile'])
    // })
  }

}
