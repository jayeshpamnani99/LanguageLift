import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup,Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SignupService } from 'src/app/services/signup.service';
import { SignupConfirmationDialogComponent } from '../signup-confirmation-dialog/signup-confirmation-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private signupService:SignupService,private router:Router,public dialog: MatDialog){}
  login!: FormGroup;

  ngOnInit():void{
    this.login = new FormGroup({
      email: new FormControl("",[ Validators.required]),
    password: new FormControl("",[Validators.required]),
    });
    
  }



  isUserLoggedIn:Boolean=false;
  signUp=new FormGroup({});

  signUpSubmit(){
    this.router.navigateByUrl("/signup");
  }

  // loginSubmit(){
  //   this.signupService.loginUser(
  //     [this.login.value.email||'',
  //       this.login.value.password||''
  //     ]
  //   ).subscribe(res=>{
      
  //     if(res=="False"){
  //       console.log("Invalid Credentials")
  //     }
  //     else{
  //       console.log("login Successful");
  //       this.isUserLoggedIn=true;
  //       this.signupService.setToken("token");
  //       this.router.navigateByUrl("/dashboard");
  //     }
  //   })
  // }

  get Email(){
    return this.login.get("email") as FormControl
  }
  get Password(){
    return this.login.get("password") as FormControl
  }

  loginSubmit() {
      if (this.login.valid) {
        const formData = this.login.value;
        this.signupService.login(formData).subscribe(
          (response) => {
            console.log('Signup successful:', response);

            if (response && response.message === "Successfully logged in!") {
              this.router.navigateByUrl("/student-dashboard");
            } else {
              console.warn('Unexpected response status:', response.status);
            }
          },
          (error) => {
              this.openConfirmationDialogOnFailure('invalid credentials','TRY AGAIN!');
              console.warn('Email already registered!');
          }
        );
      }
    }

  openConfirmationDialogOnFailure(message: string,title:string): void {
    const dialogRef = this.dialog.open(SignupConfirmationDialogComponent, {
      width: '250px',
      data: { message,buttonName:"Try Again" ,title:title},
      position: { top: '00%', left: '50%' },
      panelClass: 'custom-dialog-container', // You can define your custom CSS class for styling
    });
  
    dialogRef.afterClosed().subscribe(() => {
      this.Password.setValue("");
      this.Email.setValue("");
      // You can perform any additional actions after the dialog is closed
    });
  } 
}
