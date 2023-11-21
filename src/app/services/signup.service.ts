import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient) { }

  umsUrl="localhostABC/";

  currentUserName:BehaviorSubject<any> = new BehaviorSubject(null);

  jwtHelperService = new JwtHelperService();

  registerUser(user:Array<String>){
    return this.http.post(this.umsUrl+"newUser/",{
      FirstName:user[0],
      LastName:user[1],
      Email:user[2],
      Mobile:user[3],
      Password:user[4]
    },{
      responseType:'json'
    });
  }

  loginUser(userLoginCred:Array<String>){
    return this.http.post(this.umsUrl+"loginUser/",{
      username:userLoginCred[0],
      password:userLoginCred[1]
    },{
      responseType:'json'
    });
  }

  setToken(token:String){
    localStorage.setItem("token",token.toString());
    this.loadCurrentUser();
  }

  loadCurrentUser(){
    const token = localStorage.getItem("token");
    const user = this.jwtHelperService.decodeToken(token||'');
    const data =  user?{
      name:user.name,
      email:user.email,
      id:user.id
    }:null;
    this.currentUserName.next(data);
  }
}
