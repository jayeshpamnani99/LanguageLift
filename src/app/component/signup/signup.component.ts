import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup,Validators } from '@angular/forms';
import { SignupService } from 'src/app/services/signup.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private signupService:SignupService,private router:Router){}
  errorMessage :String = 'none';
  displayMessage:String="";
  isAccCreated:Boolean=false;

  ngOnInit():void{

  }
  registerForm = new FormGroup({
    name: new FormControl("",[Validators.required]),
    email: new FormControl("",[Validators.email, Validators.required]),
    password: new FormControl("",[Validators.required,
    Validators.minLength(8),Validators.maxLength(15)]),
    confirmPassword: new FormControl("",Validators.required),
  });

  login(){
    this.router.navigateByUrl("/login");
    
  }

  signUpSubmitted(){
    console.log(this.registerForm)
    if (this.Password.value==this.ConfirmPassword.value){
      console.log(this.registerForm)
      alert("Successfully Registered")
    this.router.navigateByUrl("/login");
      // this.signupService.registerUser(
      //   [
      //     this.registerForm.value.name||'',
      //     this.registerForm.value.email||'',
      //     this.registerForm.value.password||''
      //   ]
      // ).subscribe(res=>{
      //   if(res=="True"){
      //     this.displayMessage="Account Created Successfully"
      //     this.isAccCreated=true
      //   }
      //   else if(res="False"){
      //     this.displayMessage="Account Already Exisists"
      //   }
      //   else{
      //     this.displayMessage="Something Went Wrong"
      //   }
      // })
    }
    else{
      alert("Password and Confirm Password should be same");
      this.Password.setValue("");
      this.ConfirmPassword.setValue("");
    }
  }

  get name(){
    return this.registerForm.get("name") as FormControl
  }
  get Email(){
    return this.registerForm.get("email") as FormControl
  }
  get Password(){
    return this.registerForm.get("password") as FormControl
  }
  get ConfirmPassword(){
    return this.registerForm.get("confirmPassword") as FormControl
  }

}
