import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  updateProfilePhoto(email: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('photo', file);
    return this.http.post('http://localhost:8080/api/user/updateProfilePhoto', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  getUser(): Observable<any> {
    return this.http.get('http://localhost:8080/api/user');
  }
}
