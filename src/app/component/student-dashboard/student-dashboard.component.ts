import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { CourseModel } from 'src/app/Models/courseModel';
import { MatDialog } from '@angular/material/dialog';
import { SignupConfirmationDialogComponent } from '../signup-confirmation-dialog/signup-confirmation-dialog.component';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/local-storage.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})

export class StudentDashboardComponent implements OnInit {
  courses: CourseModel[] = [];
  enrolledCourses: CourseModel[] = [];
  viewAllCourses: boolean = true; // To toggle between tabs
  buttonType: string = 'Enroll';

  constructor(private courseService: CourseService, public dialog: MatDialog,private router:Router ,private localstorage:LocalStorageService) {}

  
  ngOnInit() {
    
    if (this.localstorage.get('token')==null){
      this.openDialog('Please login to view all courses!','Not Logged in',0,'login');
      this.router.navigateByUrl("/login");
    }
    else if (this.localstorage.get('role')==2){
      this.openDialog('Logged in as teacher','You do not have permission to view the student dashboard',0,'teacher-dashboard');
      this.router.navigateByUrl("/teacher-dashboard");
    }
    this.loadAllCourses();
  }

  loadAllCourses() {
    this.courseService.getUnenrolledCourses().subscribe(
      (courses) => {
        console.log(courses);
        this.courses = courses.courseDetails;
      },
      (      error: any) => {
        this.openDialog('Please login to view all courses!','Not Logged in',0,'login');
        this.router.navigateByUrl("/login");
        console.error('Error fetching all courses:', error);
      }
    );
  }

  loadMyCourses() {
    this.courseService.getMyCourses().subscribe(
      (courses) => {
        console.log(courses);
        this.courses = courses.courseDetails;
      },
      (      error: any) => {
        console.error('Error fetching my enrolled courses:', error);
      }
    );
  }

  showAllCourses() {
    this.viewAllCourses = true;
    this.loadAllCourses();
    this.buttonType='Enroll';
  }

  showMyCourses() {
    this.viewAllCourses = true;
    this.loadMyCourses();
    this.buttonType='View this Course';
  }

  buttonClick(courseId: any) {
    if (this.buttonType=='Enroll'){
    this.courseService.enrollCourse(courseId).subscribe(
      (response) => {
        console.log('Course enrolled successfully:', response);
        this.openConfirmationDialog('Course enrolled successfully!','Confirmation',courseId);
      },
      (error) => {
        console.error('Error enrolling course:', error);
      }
    );
    }
    else{
      this.router.navigateByUrl('/student-course-view/' + courseId);
    }


  }

  openConfirmationDialog(message: string,title:string,id:number): void {
    const dialogRef = this.dialog.open(SignupConfirmationDialogComponent, {
      width: '250px',
      data: { message ,buttonName:"View Course",title:title},
      panelClass: 'custom-dialog-container', 
    });
  
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigateByUrl('/student-course-view/' + id);
      // You can perform any additional actions after the dialog is closed
    });
  }
  openDialog(message: string,title:string,id:number,buttonName:string): void {
    const dialogRef = this.dialog.open(SignupConfirmationDialogComponent, {
      width: '250px',
      data: { message ,buttonName,title:title},
      panelClass: 'custom-dialog-container', 
    });
  
    dialogRef.afterClosed().subscribe(() => {
    });
  }

  signOut(){
    this.localstorage.remove('token');
    this.localstorage.remove('role');
    this.localstorage.remove('id');
    this.router.navigateByUrl("/login");
  }
}
