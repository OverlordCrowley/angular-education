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
  users?: IUser[],
  error: string | null;

}


export const initialUserState: IUserState = {
  user: {
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    hobby: [],
    img: ""
  },
  users: [],
  error: null
};

