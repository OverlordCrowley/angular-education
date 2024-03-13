export interface IUser{
  email: string;
  pass: string;
  phone: string;
  firstName: string;
  lastName: string;
  hobbies: string;
  image? : string;
}
export interface IUserState{
  user: IUser | null,
  users?: IUser[] | null,
  error: string | null;
  pages: object | null;

}


export const initialUserState: IUserState = {
  user: null,
  users: null,
  error: null,
  pages: null
};

