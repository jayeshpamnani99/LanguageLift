import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup,Validators } from '@angular/forms';
import { SignupService } from 'src/app/services/signup.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SignupConfirmationDialogComponent } from '../signup-confirmation-dialog/signup-confirmation-dialog.component';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private signupService:SignupService,private router:Router,public dialog: MatDialog){}
  errorMessage :String = 'none';
  displayMessage:String="";
  isAccCreated:Boolean=false;
  registerForm!: FormGroup;
  


  ngOnInit():void{
    this.registerForm = new FormGroup({
      name: new FormControl("",[Validators.required]),
      email: new FormControl("",[Validators.email, Validators.required]),
      password: new FormControl("",[Validators.required,
      Validators.minLength(8),Validators.maxLength(15)]),
      confirmPassword: new FormControl("",Validators.required),
      roleName: new FormControl('student'),
    });
    
  }

  login(){
    this.router.navigateByUrl("/login");
  }

  signUpSubmitted() {
    if (this.Password.value==this.ConfirmPassword.value){
      if (this.registerForm.valid) {
        const formData = this.registerForm.value;
        this.signupService.signup(formData).subscribe(
          (response) => {
            console.log('Signup successful:', response);

            if (response && response.message === "user signed up successfully!") {
              this.openConfirmationDialog('User signed up successfully!','Confirmation');
              console.log('User signed up successfully!');
            } else {
              console.warn('Unexpected response status:', response.status);
            }
          },
          (error) => {
            if (error  && error.error && error.error.message === 'Email already registered!') {
              this.openConfirmationDialogOnFailure('Email already registered!','Already Registered');
              console.warn('Email already registered!');
            } else {
              this.openConfirmationDialogOnFailure('Unexpected Error Please try again later','Error');
              console.error('Unexpected Error Please try again later',error);
            }
          }
        );
      }
    }
    else{
          this.openConfirmationDialogOnFailure('Password and Confirm Password should be same','Try Again!');
          this.Password.setValue("");
          this.ConfirmPassword.setValue("");
        }
  }
  openConfirmationDialog(message: string,title:string): void {
    const dialogRef = this.dialog.open(SignupConfirmationDialogComponent, {
      width: '250px',
      data: { message ,buttonName:"Login",title:title},
      panelClass: 'custom-dialog-container', 
    });
  
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigateByUrl("/login");
      // You can perform any additional actions after the dialog is closed
    });
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
      this.ConfirmPassword.setValue("");
      this.name.setValue("");
      this.Email.setValue("");
      // You can perform any additional actions after the dialog is closed
    });
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
