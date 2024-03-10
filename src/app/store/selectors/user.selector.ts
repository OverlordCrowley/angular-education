import { createSelector, createFeatureSelector } from '@ngrx/store';
import {IUser, IUserState} from '../state/user.state';

export const selectUsersState = createFeatureSelector<IUserState>('user');

export const selectCurrentUser = createSelector(
  selectUsersState,
  (state: IUserState) => state.user
);

export const selectAllUser = createSelector(
  selectUsersState,
  (state: any) => state.users
);

export const isUserDataAvailable = createSelector(
  selectCurrentUser,
  (user: IUser | null) => {
    if (user != null) {
      return true;
    } else {
      return false;
    }
  }
);
