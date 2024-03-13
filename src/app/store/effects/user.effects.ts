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
          localStorage.setItem('user', JSON.stringify(response));
          return UserActions.SignInSuccess({ user: response });
        }),
        catchError(error => of(UserActions.SignInFailure({ error: error.message })))
      )
    )
  ));

  signUp$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.SignUp),
    mergeMap(({ name, email, password, lastName, hobbies, phone }) =>
      this.userService.signUp(name, email, password, lastName, hobbies, phone).pipe(
        map(response => {
          localStorage.setItem('user', JSON.stringify(response));
          return UserActions.SignUpSuccess({ user: response });
        }),
        catchError(error => of(UserActions.SignUpFailure({ error: error.message })))
      )
    )
  ));


  updateProfilePhoto$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.UpdateProfilePhoto),
    mergeMap(({ email, file }) =>
      this.userService.updateProfilePhoto(email, file).pipe(
        map(response => {
          localStorage.setItem('user', JSON.stringify(response))
          return UserActions.UpdateProfilePhotoSuccess({ user: response })
        } ),
        catchError(error => of(UserActions.UpdateProfilePhotoFailure({ error: error.message })))
      )
    )
  ));

  getUsers$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.GetUsers),
    mergeMap(({page}) =>
      this.userService.getAllUsers(Number(page)).pipe(
        map(response => UserActions.GetUsersSuccess({ users: response.users, totalPages: response.totalPages, currentPage: response.currentPage, })),
        catchError(error => of(UserActions.GetUsersFailure({ error: error.message })))
      )
    )
  ));
}
