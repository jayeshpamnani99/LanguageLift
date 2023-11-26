import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup,Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SignupService } from 'src/app/services/signup.service';
import { SignupConfirmationDialogComponent } from '../signup-confirmation-dialog/signup-confirmation-dialog.component';
import { LocalStorageService } from 'src/app/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private signupService:SignupService,private router:Router,public dialog: MatDialog, localStorage:LocalStorageService){}
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

            if (response && response.message === "Successfully logged in!") {
              
              localStorage.setItem("token",response.jwtToken);
              localStorage.setItem("id",response.userDetails.id);
              localStorage.setItem("role",response.userDetails.roleId);
              console.log('localStorage',localStorage.getItem("token"));
              if (response.userDetails.roleId==1){
                this.router.navigateByUrl("/student-dashboard");
              }
              else{
                this.router.navigateByUrl("/teacher-dashboard");
                // teacher dashboard
              }
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
