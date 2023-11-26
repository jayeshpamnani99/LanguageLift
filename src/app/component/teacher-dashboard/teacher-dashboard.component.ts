import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CourseModel } from 'src/app/Models/courseModel';
import { CourseService } from 'src/app/services/course.service';
import { SignupConfirmationDialogComponent } from '../signup-confirmation-dialog/signup-confirmation-dialog.component';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent {
  courses: CourseModel[] = [];
  enrolledCourses: CourseModel[] = [];
  viewAllCourses: boolean = true; // To toggle between tabs
  buttonType: string = 'View this Course';

  constructor(private courseService: CourseService, public dialog: MatDialog,private router:Router ) {}

  ngOnInit() {
    this.loadAllCourses();
  }

  loadAllCourses() {
    this.courseService.getCoursesByTeacherId().subscribe(
      (courses) => {
        console.log(courses);
        this.courses = courses.courseDetails;
      },
      (      error: any) => {
        this.openDialog('Please login to view all courses!','Confirmation',0);
        this.router.navigateByUrl("/login");
        console.error('Error fetching all courses:', error);
      }
    );
  }

  

  showAllCourses() {
    this.viewAllCourses = true;
    this.loadAllCourses();
    this.buttonType='Enroll';
  }


  buttonClick(courseId: any) {
      this.router.navigateByUrl('/teacher-course-view/' + courseId);
  }

  // openConfirmationDialog(message: string,title:string,id:number): void {
  //   const dialogRef = this.dialog.open(SignupConfirmationDialogComponent, {
  //     width: '250px',
  //     data: { message ,buttonName:"View Course",title:title},
  //     panelClass: 'custom-dialog-container', 
  //   });
  
  //   dialogRef.afterClosed().subscribe(() => {
  //     this.router.navigateByUrl('/student-course-view/' + id);
  //   });
  // }
  openDialog(message: string,title:string,id:number): void {
    const dialogRef = this.dialog.open(SignupConfirmationDialogComponent, {
      width: '250px',
      data: { message ,buttonName:"View Course",title:title},
      panelClass: 'custom-dialog-container', 
    });
  
    dialogRef.afterClosed().subscribe(() => {
    });
  }

}
