export interface IUser{
  email: string,
  phone: string,
  firstName: string,
  lastName: string,
  hobby: string[],
}
export interface IUserState{
  user: IUser
}


export const initialUserState: IUserState = {
  user: null
};
