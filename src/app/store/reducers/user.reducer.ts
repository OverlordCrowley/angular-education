import {initialUserState} from "../state/user.state";
import {userActions} from "../actions/user.actions";


export const userReducers = {
  state = initialUserState,
  action: userActions
}
