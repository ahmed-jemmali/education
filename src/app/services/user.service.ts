import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userURL: string = "http://localhost:3000/api/users";
  constructor(private httpClient: HttpClient) { }

  login(user) {
    return this.httpClient.post<{user:any,message :string}>(`${this.userURL}/login`, user);
  };

  signup(user) {
    return this.httpClient.post<{ message: string }>(`${this.userURL}/signup`, user);
  };
}
