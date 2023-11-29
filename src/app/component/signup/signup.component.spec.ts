import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [
        HttpClientTestingModule, // Provide HttpClient for testing
        RouterTestingModule,     // Mocks the router
        MatDialogModule,         // Mocks MatDialog
        ReactiveFormsModule
      ]

    });
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it ('should validate name, email, password, and confirmPassword fields', () => {
    let name = component.registerForm.controls['name'];
    let email = component.registerForm.controls['email'];
    let password = component.registerForm.controls['password'];
    let confirmPassword = component.registerForm.controls['confirmPassword'];

    // Initially, all fields are empty, so form should be invalid
    expect(component.registerForm.valid).toBeFalsy();

    // Fill only name, form should still be invalid
    name.setValue('test');
    expect(component.registerForm.valid).toBeFalsy();

    // Fill only email, form should still be invalid
    email.setValue('test@test.com');
    expect(component.registerForm.valid).toBeFalsy();
    password.setValue('password123');
    expect(component.registerForm.valid).toBeFalsy();
    confirmPassword.setValue('password123');
    expect(component.registerForm.valid).toBeTruthy();
  });


  
  it (' email id not set properly', () => {
    let name = component.registerForm.controls['name'];
    let email = component.registerForm.controls['email'];
    let password = component.registerForm.controls['password'];
    let confirmPassword = component.registerForm.controls['confirmPassword'];

    // Initially, all fields are empty, so form should be invalid
    expect(component.registerForm.valid).toBeFalsy();

    // Fill only name, form should still be invalid
    name.setValue('test');
    expect(component.registerForm.valid).toBeFalsy();

    // Fill only email, form should still be invalid
    email.setValue('test');
    expect(component.registerForm.valid).toBeFalsy();
    password.setValue('password123');
    expect(component.registerForm.valid).toBeFalsy();
    confirmPassword.setValue('password123');
    expect(component.registerForm.valid).toBeFalsy();
  });
it ('password not set properly', () => {
    let name = component.registerForm.controls['name'];
    let email = component.registerForm.controls['email'];
    let password = component.registerForm.controls['password'];
    let confirmPassword = component.registerForm.controls['confirmPassword'];

    // Initially, all fields are empty, so form should be invalid
    expect(component.registerForm.valid).toBeFalsy();

    // Fill only name, form should still be invalid
    name.setValue('test');
    expect(component.registerForm.valid).toBeFalsy();

    // Fill only email, form should still be invalid
    email.setValue('test@gmail.com');
    expect(component.registerForm.valid).toBeFalsy();
    password.setValue('pass');
    expect(component.registerForm.valid).toBeFalsy();
    confirmPassword.setValue('pass');
    expect(component.registerForm.valid).toBeFalsy();
  }
);

it('should call signUpSubmit on form submit', () => {
      
  spyOn(component, 'login');
  let button = fixture.debugElement.nativeElement.querySelector('.btn-signup');
  button.click();
  expect(component.login).toHaveBeenCalled();
});

it('should call loginSubmit method when the form is submitted', () => {
  spyOn(component, 'signUpSubmitted');
  const form = fixture.nativeElement.querySelector('form');
  form.dispatchEvent(new Event('submit'));

  fixture.detectChanges();
  expect(component.signUpSubmitted).toHaveBeenCalled();
});

});
