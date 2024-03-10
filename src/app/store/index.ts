import { IUserState} from "./state/user.state";
import { ActionReducerMap} from "@ngrx/store";
import {userReducer} from "./reducers/user.reducer";

export interface IAppState{
    user: IUserState
}

export const reducers: ActionReducerMap<IAppState> = {
  user: userReducer
};
