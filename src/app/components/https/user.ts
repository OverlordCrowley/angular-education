import axios from "axios";
export function getUser(){
  try {
    let user: string | null = localStorage.getItem('user');
    if (user !== null) {
      return JSON.parse(user);
    }
    return "";
  }
  catch (e){

  }
}

export function logOut(){
  localStorage.setItem('user', JSON.stringify(''));
}

export async function singIn(email: string, password: string){
  let result  = await axios.post(`http://localhost:8080/api/user/login`,
    {"email": email, "password": password}
  )
  return result;
}

export async function signUp(username: string, email: string, password: string){
  let result  = await axios.post(`http://localhost:8080/api/user/registration`,
    {"name": username, "email": email, "password": password}
  )
  return result;
}
