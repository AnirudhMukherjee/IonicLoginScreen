import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  constructor(private http:HttpClient){}

  currentUser: User;

    login(registerCredentials) {
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      console.log(JSON.stringify(registerCredentials));

      let promise = new Promise((resolve, reject) => {
          this.http.post('http://8sqm.com:3000/' + 'users/login', JSON.stringify(registerCredentials), {headers: new HttpHeaders({'Content-Type': 'application/json'})})
          .subscribe((res: Response) => {
              let userResponse = JSON.parse(JSON.stringify(res));
              console.log(userResponse);
              if (userResponse.code === 200) {
                  let token = userResponse.data.token;
                  console.log('setting local token: ' + token);
                  localStorage.setItem('userToken', token);
                   resolve(userResponse.data);
              } else {
                  reject('login failed');
              }
          });
      });
      return promise;
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

  vendorService(vendors){

    console.log(JSON.stringify(vendors));

    let promise = new Promise((resolve, reject) => {
      this.http.post('http://8sqm.com:3000/services/nearby', JSON.stringify(vendors), {headers: new HttpHeaders({'Content-Type': 'application/json'})})
      .subscribe((res: Response) => {
          let userResponse = JSON.parse(JSON.stringify(res));
          console.log(userResponse);
           if (userResponse.code === 200) {
                resolve(userResponse);
           } 
          else {
              reject('Error');
          }
      });
  });
  return promise;
  }

}
