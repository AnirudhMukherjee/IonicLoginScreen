import { HttpClient } from '@angular/common/http';
import {Http, Headers, Response} from '@angular/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export class User {
  name: string;
  email: string;
  phoneNumber: string;
 
  constructor(name: string, email: string, phoneNumber:string) {
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
  }
}

@Injectable()
export class AuthServiceProvider {

  constructor(public http:Http){}

  currentUser: User;

  public login(credentials) {
    let access= false;
    if (credentials.phoneNumber === null) {
      //return Observable.throw("Please insert credentials");
    } else {
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        console.log(JSON.stringify(credentials));
        this.http.post('http://8sqm.com:3000/users/login',JSON.stringify(credentials),{headers:headers})
        .map((res: Response) =>{
        res.json();
        console.log(res.json())
        })
        .subscribe(data=>{console.log(data)});
    }
  }
 
  public register(credentials) {
    if (credentials.phoneNumber === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }
 
  public getUserInfo() : User {
    return this.currentUser;
  }
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

}
