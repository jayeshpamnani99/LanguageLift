import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup,Validators } from '@angular/forms';
import { SignupService } from 'src/app/services/signup.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private signupService:SignupService){}
    login = new FormGroup({
    email: new FormControl("",[ Validators.required]),
    password: new FormControl("",[Validators.required]),
  });


  loginSubmit(){
    this.signupService.loginUser(
      [this.login.value.email||'',
        this.login.value.password||''
      ]
    ).subscribe(res=>{
      if(res=="True"){
        console.log("login Successful")
      }
      else{
        console.log("Invalid Credentials")
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
