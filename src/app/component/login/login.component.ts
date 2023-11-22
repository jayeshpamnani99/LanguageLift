import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from 'src/app/services/signup.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private signupService:SignupService,private router:Router){}



    login = new FormGroup({
    email: new FormControl("",[ Validators.required]),
    password: new FormControl("",[Validators.required]),
  });

  isUserLoggedIn:Boolean=false;
  signUp=new FormGroup({});

  signUpSubmit(){
    this.router.navigateByUrl("/signup");
  }

  loginSubmit(){
    this.signupService.loginUser(
      [this.login.value.email||'',
        this.login.value.password||''
      ]
    ).subscribe(res=>{
      
      if(res=="False"){
        console.log("Invalid Credentials")
      }
      else{
        console.log("login Successful");
        this.isUserLoggedIn=true;
        this.signupService.setToken("token");
        this.router.navigateByUrl("/dashboard");
      }
    })
  }

  get Email(){
    return this.login.get("email") as FormControl
  }
  get Password(){
    return this.login.get("password") as FormControl
  }
  
}
