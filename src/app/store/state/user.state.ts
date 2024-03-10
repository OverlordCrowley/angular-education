export interface IUser{
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  hobby: string[];
  img? : string;
}
export interface IUserState{
  user: IUser | null,
  users?: IUser[] | null,
  error: string | null;

}


export const initialUserState: IUserState = {
  user: null,
  users: null,
  error: null
};

