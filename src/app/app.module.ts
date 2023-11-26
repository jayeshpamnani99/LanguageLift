import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './component/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupService } from './services/signup.service';
import { LoginComponent } from './component/login/login.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { StudentCourseViewComponent } from './component/student-course-view/student-course-view.component';
import { StudentDashboardComponent } from './component/student-dashboard/student-dashboard.component';
import { SignupConfirmationDialogComponent } from './component/signup-confirmation-dialog/signup-confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    // DashboardInstructorComponent,
    CourseDetailsComponent,
    StudentCourseViewComponent,
    StudentDashboardComponent,
    SignupConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule

  ],
  providers: [SignupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
