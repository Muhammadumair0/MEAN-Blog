import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestMethod, RequestOptions } from "@angular/http";
import { tokenNotExpired } from "angular2-jwt";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class AuthService {

  domain: string = "http://localhost:3000"; //only when api and client host are different

  authToken;
  user;

  constructor(private http: Http) { }

  loadToken() {
    this.authToken = localStorage.getItem("token");
  }

  RequestOptions() {
    const headers = new Headers({
      "Content-Type": "application/json",
      "authorization": this.authToken
    });
    const requestOptions = new RequestOptions({ headers: headers });
    return requestOptions;
  }
  registerUser(userValues) {

    return this.http.post(this.domain + "/register", userValues, this.RequestOptions())
      .map(data => data.json());

  }

  checkUser(username) {
    return this.http.get(this.domain + "/checkusername/" + username).map(res => res.json());
  }

  checkEmail(email) {
    return this.http.get(this.domain + "/checkemail/" + email).map(res => res.json());
  }

  login(user) {
    console.log("here everthing is working fine");
    return this.http.post(this.domain + "/api/login", user, this.RequestOptions()).map(res => res.json());
  }

  getProfile() {
    this.authToken = localStorage.getItem("token");
    return this.http.get(this.domain + "/profile", this.RequestOptions()).map(res => res.json());
  }

  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
  storeUserData(token, user) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", user);
    this.authToken = token;
    this.user = user;
  }

  loggedIn() {
    return tokenNotExpired();
  }
}