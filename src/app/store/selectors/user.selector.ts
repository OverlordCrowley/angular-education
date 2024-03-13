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

export const selectPages = createSelector(
  selectUsersState,
  (state: any) => ({ currentPage: state.currentPage, totalPages: state.totalPages })
);

export const isUserDataAvailable = createSelector(
  selectCurrentUser,
  (user: IUser | null) => {
    return user != null;
  }
);
