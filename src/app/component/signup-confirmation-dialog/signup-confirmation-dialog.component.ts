// signup-confirmation-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-signup-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>{{data.title}}</h2>
    <mat-dialog-content>
      <p>{{ data.message }}</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close color="primary">{{data.buttonName}}</button>
    </mat-dialog-actions>
  `,
  styleUrls: ['./signup-confirmation-dialog.component.css'],
})
export class SignupConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SignupConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string ,buttonName:string,title:string}
  ) {}
}
