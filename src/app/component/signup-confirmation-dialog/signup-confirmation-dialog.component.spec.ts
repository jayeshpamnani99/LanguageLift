import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupConfirmationDialogComponent } from './signup-confirmation-dialog.component';

describe('SignupConfirmationDialogComponent', () => {
  let component: SignupConfirmationDialogComponent;
  let fixture: ComponentFixture<SignupConfirmationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupConfirmationDialogComponent]
    });
    fixture = TestBed.createComponent(SignupConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
