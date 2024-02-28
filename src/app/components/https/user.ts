import axios from "axios";
export function getUser(){
  let user: string | null = localStorage.getItem('user');
  if (user !== null) {
    return JSON.parse(user);
  }
  return "";
}

export function logOut(){
  localStorage.setItem('user', JSON.stringify(''));
}

export async function singIn(email: string, password: string){
  let result  = await axios.post(`http://localhost:8080/user/signIn`,
    {"email": email, "password": password}
  )
  return result;
}

export async function signUp(username: string, email: string, password: string){
  let result  = await axios.post(`http://localhost:8080/user/signUp`,
    {"username": username, "email": email, "password": password}
  )
  return result;
}
