import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public apiUrl = 'http://167.99.13.130:3000/api';

  public headers = new HttpHeaders();


  constructor(private http: HttpClient) {
    this.headers.set('authorization', localStorage.getItem('token'));
  }

  login(user) {
    return this.http.post(`${this.apiUrl}/auth/login`, user);
  }

  register(user) {
    return this.http.post(`${this.apiUrl}/auth/registration`, user);
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  userInfo() {
    let headers = new HttpHeaders();
    headers = headers.set('authorization', `Bearer ${ localStorage.getItem('token')}`);
    return this.http.request('GET', `${this.apiUrl}/settings`, {headers});
  }

  setReminder(details) {
    let headers = new HttpHeaders();
    headers = headers.set('authorization', `Bearer ${ localStorage.getItem('token')}`);
    return this.http.post(`${this.apiUrl}/settings/create`, details, {headers});
  }

  updateReminder(details) {
    let headers = new HttpHeaders();
    headers = headers.set('authorization', `Bearer ${ localStorage.getItem('token')}`);
    return this.http.patch(`${this.apiUrl}/settings/update`, details, {headers});
  }

  resetPassEmail(email) {

    return this.http.post(`${this.apiUrl}/auth/resetPassEmail`, email);
  }

  resetPassword(password) {
    console.log(password);
    return this.http.put(`${this.apiUrl}/auth/resetPassword`, password);
  }
}
