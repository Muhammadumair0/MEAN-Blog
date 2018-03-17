import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestMethod, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class AuthService {

  constructor(private http: Http) { }
  domain: string = "http://localhost:3000"; //only when api and client host are different

  registerUser(userValues) {

    let headers = new Headers({ "Content-Type": "application/json" });
    let requestOptions = new RequestOptions({ headers });

    return this.http.post(this.domain + "/register", userValues, requestOptions)
      .map(data => data.json());

  }

  checkUser(username) {
    return this.http.get(this.domain + "/checkusername/" + username).map(res => res.json());
  }

  checkEmail(email) {
    return this.http.get(this.domain + "/checkemail/" + email).map(res => res.json());
  }


}
