import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { SignupService } from 'src/app/services/signup.service';

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
// Testing ngOnInit to ensure form is initialized correctly
it('should initialize registerForm with form controls on ngOnInit', () => {
  component.ngOnInit();
  expect(component.registerForm.contains('name')).toBeTruthy();
  expect(component.registerForm.contains('email')).toBeTruthy();
  expect(component.registerForm.contains('password')).toBeTruthy();
  expect(component.registerForm.contains('confirmPassword')).toBeTruthy();
  expect(component.registerForm.contains('roleName')).toBeTruthy();
});

// Testing signUpSubmitted for valid form but with non-matching passwords
it('should not call signupService if passwords do not match', () => {
  spyOn(component, 'openConfirmationDialogOnFailure');
  component.registerForm.controls['password'].setValue('12345678');
  component.registerForm.controls['confirmPassword'].setValue('87654321');
  component.signUpSubmitted();
  expect(component.openConfirmationDialogOnFailure).toHaveBeenCalledWith('Password and Confirm Password should be same', 'Try Again!');
});

// Testing signUpSubmitted for a valid form submission
it('should call signupService on valid form submission', fakeAsync(() => {
  const signupService = TestBed.inject(SignupService);
  spyOn(signupService, 'signup').and.returnValue(of({message: 'user signed up successfully!'}));
  component.registerForm.controls['name'].setValue('John Doe');
  component.registerForm.controls['email'].setValue('john@example.com');
  component.registerForm.controls['password'].setValue('12345678');
  component.registerForm.controls['confirmPassword'].setValue('12345678');
  component.signUpSubmitted();
  tick(); // Simulate the passage of time until all pending asynchronous activities finish
  expect(signupService.signup).toHaveBeenCalled();
}));

// Testing signUpSubmitted for handling server response success
it('should handle successful signup response', fakeAsync(() => {
  const mockResponse = {message: 'user signed up successfully!'};
  const signupService = TestBed.inject(SignupService);

  spyOn(signupService, 'signup').and.returnValue(of(mockResponse));
  spyOn(component, 'openConfirmationDialog');
  component.registerForm.controls['name'].setValue('John Doe');
  component.registerForm.controls['email'].setValue('john@example.com');
  component.registerForm.controls['password'].setValue('12345678');
  component.registerForm.controls['confirmPassword'].setValue('12345678');
  component.signUpSubmitted();
  tick();
  expect(component.openConfirmationDialog).toHaveBeenCalledWith('User signed up successfully!', 'Confirmation');
}));

// Testing signUpSubmitted for handling server response error
it('should handle email already registered response error', fakeAsync(() => {
  const mockError = {error: {message: 'Email already registered!'}};
  const signupService = TestBed.inject(SignupService);

  spyOn(signupService, 'signup').and.returnValue(throwError(mockError));
  spyOn(component, 'openConfirmationDialogOnFailure');
  component.registerForm.controls['name'].setValue('John Doe');
  component.registerForm.controls['email'].setValue('john@example.com');
  component.registerForm.controls['password'].setValue('12345678');
  component.registerForm.controls['confirmPassword'].setValue('12345678');
  component.signUpSubmitted();
  tick();
  expect(component.openConfirmationDialogOnFailure).toHaveBeenCalledWith('Email already registered!', 'Already Registered');
}));

});
