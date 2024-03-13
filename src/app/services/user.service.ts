import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {HttpClientModule} from "@angular/common/http";
import { Observable } from 'rxjs';
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

    signIn(email: string, password: string): Observable<any> {
      return this.http.post('http://localhost:8080/api/user/login', { email, password });
    }

  signUp(name: string, email: string, password: string, lastName: string, hobbies: string[], phone: string): Observable<any> {
    return this.http.post('http://localhost:8080/api/user/registration', { name, email, password, lastName, hobbies, phone });
  }

  updateProfilePhoto(email: string, photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('photo', photo);
    // return this.http.post('http://localhost:8080/api/user/updateProfilePhoto', formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // });

    return this.http.post<any>('http://localhost:8080/api/user/updateProfilePhoto', formData);
  }

  getUser(): Observable<any> {
    return this.http.get('http://localhost:8080/api/user');
  }


  getAllUsers(page: number): Observable<any> {
    return this.http.get(`http://localhost:8080/api/user/getAll?page=${page}&limit=1`);
  }
}
