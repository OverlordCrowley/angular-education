import {Action, createAction, props} from "@ngrx/store";

export enum EUserActions{
  GetUser = '[User] Get User',
  SetUser = '[User] Set User'
}
export class GetUser implements Action{
  public readonly type = EUserActions.GetUser
}

export class SetUser implements Action{
  public type = EUserActions.SetUser
}

export const userActions = GetUser | SetUser;


