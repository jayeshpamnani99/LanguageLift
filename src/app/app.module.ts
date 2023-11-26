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
import { ViewCourseModuleComponent } from './component/view-course-module/view-course-module.component';
import { ViewQuizModuleComponent } from './component/view-quiz-module/view-quiz-module.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { TeacherDashboardComponent } from './component/teacher-dashboard/teacher-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    // DashboardInstructorComponent,
    CourseDetailsComponent,
    StudentCourseViewComponent,
    StudentDashboardComponent,
    SignupConfirmationDialogComponent,
    ViewCourseModuleComponent,
    ViewQuizModuleComponent,
    TeacherDashboardComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    NgxExtendedPdfViewerModule,

  ],
  providers: [SignupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
