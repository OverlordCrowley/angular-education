import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {of, tap} from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import * as UserActions from '../actions/user.actions';

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions, private userService: UserService) {}

  signIn$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.SignIn),
    mergeMap(({ email, password }) =>
      this.userService.signIn(email, password).pipe(
        map(response => {
          console.log(response)
          return UserActions.SignInSuccess({ user: response });
        }),
        catchError(error => of(UserActions.SignInFailure({ error: error.message })))
      )
    )
  ));

  signUp$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.SignUp),
    tap(action => console.log('SignUp action:', action)),
    mergeMap(({ name, email, password, lastName, hobbies, phone }) =>
      this.userService.signUp(name, email, password, lastName, hobbies, phone).pipe(
        map(response => UserActions.SignUpSuccess({ user: response })),
        catchError(error => of(UserActions.SignUpFailure({ error: error.message })))
      )
    )
  ));

  updateProfilePhoto$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UpdateProfilePhoto),
    mergeMap(({ email, file }) =>
      this.userService.updateProfilePhoto(email, file).pipe(
        map(response => UserActions.UpdateProfilePhotoSuccess({ user: response })),
        catchError(error => of(UserActions.UpdateProfilePhotoFailure({ error: error.message })))
      )
    )
  ));

  getUsers$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.GetUsers),
    mergeMap(() =>
      this.userService.getUser().pipe(
        map(response => UserActions.GetUsersSuccess({ users: response })),
        catchError(error => of(UserActions.GetUsersFailure({ error: error.message })))
      )
    )
  ));
}
