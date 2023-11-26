import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {BehaviorSubject,Observable} from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient) { }


  umsUrl=`${environment.apiBaseUrl}${environment.umsPort}`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  currentUserName:BehaviorSubject<any> = new BehaviorSubject(null);

  jwtHelperService = new JwtHelperService();

  signup(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(this.umsUrl+'/signup', data, { headers });
  }

  login(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(this.umsUrl+'/login', data, { headers });
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
}
