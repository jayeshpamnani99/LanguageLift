import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {BehaviorSubject,Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient) { }

  umsUrl="http://35.171.189.199:8081/";
  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1IiwiZXhwIjoxNzAxNDg0NzcxLCJuYW1lIjoiTWFuYXYgR3VwdGEiLCJlbWFpbCI6Im1hbmF2Z0B1bWQuZWR1In0.-b-hMftxrzmrl8-dTTcjZUASqnALu2IeHt8B3w8eCD949OP8ZSgv1be2NPchLshQ0-Mk5AAlvy5uyTLfaMcNrA',
      'Content-Type': 'application/json'
    })
  };

  currentUserName:BehaviorSubject<any> = new BehaviorSubject(null);

  jwtHelperService = new JwtHelperService();

  signup(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1IiwiZXhwIjoxNzAxNDg0NzcxLCJuYW1lIjoiTWFuYXYgR3VwdGEiLCJlbWFpbCI6Im1hbmF2Z0B1bWQuZWR1In0.-b-hMftxrzmrl8-dTTcjZUASqnALu2IeHt8B3w8eCD949OP8ZSgv1be2NPchLshQ0-Mk5AAlvy5uyTLfaMcNrA',
    });

    return this.http.post(this.umsUrl+'signup', data, { headers });
  }

  login(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1IiwiZXhwIjoxNzAxNDg0NzcxLCJuYW1lIjoiTWFuYXYgR3VwdGEiLCJlbWFpbCI6Im1hbmF2Z0B1bWQuZWR1In0.-b-hMftxrzmrl8-dTTcjZUASqnALu2IeHt8B3w8eCD949OP8ZSgv1be2NPchLshQ0-Mk5AAlvy5uyTLfaMcNrA',
    });

    return this.http.post(this.umsUrl+'login', data, { headers });
  }
  

  

  registerUser(user:Array<String>){

    
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
