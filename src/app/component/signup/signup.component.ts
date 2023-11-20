import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup,Validators } from '@angular/forms';
import { SignupService } from 'src/app/services/signup.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private signupService:SignupService){}
  errorMessage :String = 'none';
  displayMessage:String="";
  isAccCreated:Boolean=false;

  ngOnInit():void{

  }
  registerForm = new FormGroup({
    firstName: new FormControl("",[Validators.required]),
    lastName: new FormControl("",[Validators.required]),
    email: new FormControl("",[Validators.email, Validators.required]),
    mobile: new FormControl("",[Validators.required, Validators.minLength(10),Validators.maxLength(10),Validators.pattern("[0-9]*")]),
    password: new FormControl("",[Validators.required,
    Validators.minLength(8),Validators.maxLength(15)]),
    confirmPassword: new FormControl("",Validators.required),
  });

  signUpSubmitted(){
    console.log(this.registerForm)
    if (this.Password.value==this.ConfirmPassword.value){
      console.log(this.registerForm)
      this.signupService.registerUser(
        [this.registerForm.value.firstName||'',
          this.registerForm.value.lastName||'',
          this.registerForm.value.email||'',
          this.registerForm.value.mobile||'',
          this.registerForm.value.password||''
        ]
      ).subscribe(res=>{
        if(res=="True"){
          this.displayMessage="Account Created Successfully"
          this.isAccCreated=true
        }
        else if(res="False"){
          this.displayMessage="Account Already Exisists"
        }
        else{
          this.displayMessage="Something Went Wrong"
        }

      console.log("aj")
      })
    }
    else{
      this.errorMessage="inline"
    }
  }

  get FirstName(){
    return this.registerForm.get("firstName") as FormControl
  }
  get LastName(){
    return this.registerForm.get("lastName") as FormControl
  }
  get Email(){
    return this.registerForm.get("email") as FormControl
  }
  get Mobile(){
    return this.registerForm.get("mobile") as FormControl
  }
  get Password(){
    return this.registerForm.get("password") as FormControl
  }
  get ConfirmPassword(){
    return this.registerForm.get("confirmPassword") as FormControl
  }
}
