import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient) { }

  umsUrl="localhostABC/";

  registerUser(user:Array<String>){
    return this.http.post(this.umsUrl+"newUser/",{
      FirstName:user[0],
      LastName:user[1],
      Email:user[2],
      Mobile:user[3],
      Password:user[4]
    },{
      responseType:'text'
    });
  }

  loginUser(userLoginCred:Array<String>){
    return this.http.post(this.umsUrl+"loginUser/",userLoginCred,{
      responseType:'text'
    });
  }
}
