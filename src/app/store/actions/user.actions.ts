import { createAction, props } from '@ngrx/store';

export enum EUserActions {
  SignIn = '[User] Sign In',
  SignInSuccess = '[User] Sign In Success',
  SignInFailure = '[User] Sign In Failure',
  SignUp = '[User] Sign Up',
  SignUpSuccess = '[User] Sign Up Success',
  SignUpFailure = '[User] Sign Up Failure',
  UpdateProfilePhoto = '[User] Update Profile Photo',
  UpdateProfilePhotoSuccess = '[User] Update Profile Photo Success',
  UpdateProfilePhotoFailure = '[User] Update Profile Photo Failure',
  LogOut = '[User] Log Out',
  GetUsers = '[User] Get Users',
  GetUsersSuccess = '[User] Get Users Success',
  GetUsersFailure = '[User] Get Users Failure'
}

export const SignIn = createAction(EUserActions.SignIn, props<{ email: string, password: string }>());
export const SignInSuccess = createAction(EUserActions.SignInSuccess, props<{ user: any }>());
export const SignInFailure = createAction(EUserActions.SignInFailure, props<{ error: string }>());

export const SignUp = createAction(EUserActions.SignUp, props<{ name: string, email: string, password: string, lastName: string, hobbies: string[], phone: string }>());
export const SignUpSuccess = createAction(EUserActions.SignUpSuccess, props<{ user: any }>());
export const SignUpFailure = createAction(EUserActions.SignUpFailure, props<{ error: string }>());

export const UpdateProfilePhoto = createAction(EUserActions.UpdateProfilePhoto, props<{ email: string, file: File }>());
export const UpdateProfilePhotoSuccess = createAction(EUserActions.UpdateProfilePhotoSuccess, props<{ user: any }>());
export const UpdateProfilePhotoFailure = createAction(EUserActions.UpdateProfilePhotoFailure, props<{ error: string }>());

export const LogOut = createAction(EUserActions.LogOut);

export const GetUsers = createAction(EUserActions.GetUsers);
export const GetUsersSuccess = createAction(EUserActions.GetUsersSuccess, props<{ users: any[] }>());
export const GetUsersFailure = createAction(EUserActions.GetUsersFailure, props<{ error: string }>());
