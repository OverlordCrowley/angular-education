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

export async function signUp(name: string, email: string, password: string,
                             lastName: string, hobbies: string[], phone: string){
  let result  = await axios.post(`http://localhost:8080/api/user/registration`,
    {"name": name, "email": email, "password": password,
    "lastName": lastName, "hobbies": hobbies, "phone": phone}
  )
  return result;
}

export async function updateProfilePhoto(email: string, file: File) {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('photo', file);

  try {
    const result = await axios.post('http://localhost:8080/api/user/updateProfilePhoto', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return result;
  } catch (error) {
    console.error('Error updating profile photo:', error);
    throw error;
  }
}
