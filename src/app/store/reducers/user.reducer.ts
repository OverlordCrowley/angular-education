  import {createReducer, on} from '@ngrx/store';
  import {initialUserState} from "../state/user.state";
  import * as UserActions from '../actions/user.actions';

  export const userReducer = createReducer(
    initialUserState,

    on(UserActions.SignInSuccess, (state, { user }) => ({
      ...state,
      user: user,
      error: null
    })),
    on(UserActions.SignInFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(UserActions.SignUpSuccess, (state, { user }) => ({
      ...state,
      user: user,
      error: null
    })),
    on(UserActions.SignUpFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(UserActions.UpdateProfilePhotoSuccess, (state, { user }) => ({
      ...state,
      user: user,
      error: null
    })),
    on(UserActions.UpdateProfilePhotoFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(UserActions.LogOut, state => ({
      ...state,
      user: null,
      error: null
    })),

    on(UserActions.GetUsersSuccess, (state, { users, totalPages, currentPage }) => ({
      ...state,
      totalPages,
      currentPage,
      users,
      error: null
    })),
    on(UserActions.GetUsersFailure, (state, { error }) => ({
      ...state,
      error
    }))
  );
