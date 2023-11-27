import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseModel } from 'src/app/Models/courseModel';
import { CourseService } from 'src/app/services/course.service';
import { SignupConfirmationDialogComponent } from '../signup-confirmation-dialog/signup-confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/local-storage.service';

@Component({
  selector: 'app-teacher-course-view',
  templateUrl: './teacher-course-view.component.html',
  styleUrls: ['./teacher-course-view.component.css']
})
export class TeacherCourseViewComponent {
  courseModulesDetails: any; // Replace 'any' with the appropriate type for your course modules
  courseIdDetails: any;
  userDetails: any;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router:Router,
    private dialog: MatDialog,
    private localstorage:LocalStorageService,

  ) {}

  ngOnInit(): void {

    if (this.localstorage.get('token')==null){
      this.openDialog1('Please login to view all courses!','Not Logged in',0,'login');
      this.router.navigateByUrl("/login");
    }
    else if (this.localstorage.get('role')==1){
      console.log(this.localstorage.get('role'));
      this.openDialog1('Logged in as Student','You do not have permission to view the student dashboard',0,'student-dashboard');
      this.router.navigateByUrl("/teacher-dashboard");
    }

    const courseId = +this.route.snapshot.params['id']; // '+' to convert string to number
    
    this.courseService.getCoursesByTeacherId().subscribe(
      (courses) => {
        console.log(courses);
        this.userDetails=courses.userDetails;
        courses = courses.courseDetails;
        this.courseIdDetails = courses.find((course: CourseModel) => course.id === courseId);
        if (!(this.courseIdDetails==undefined || this.courseIdDetails==""||(Object.keys(this.courseIdDetails).length === 0))) {
          console.log(this.courseIdDetails);
        } else {
          this.router.navigateByUrl("/teacher-dashboard");
          this.openDialog('You do not teach that course','',0);
          console.log("You are not enrolled in that course");
        }
      },
      (error: any) => {
        this.router.navigateByUrl("/student-dashboard");
        console.error('Error fetching my enrolled courses:', error);
      }
    );



    this.courseService.getCourseModuleDetails(courseId).subscribe(
      details => {
        this.courseModulesDetails = details;
      },
      error => {
        this.router.navigateByUrl("/student-dashboard");
        console.error('Error fetching course module details:', error);
      }      
    );
  }

  onModuleClick(moduleId: number,moduleContentUrl:string,moduleTypeId:number) {
    console.log('Clicked module:', moduleId);    
    if (moduleTypeId==1){
      this.router.navigateByUrl("/moduleView/"+moduleId);
    }
    else{
      this.router.navigateByUrl("/quizView/"+moduleId);
    }

  }


  openDialog(message: string,title:string,id:number): void {
    const dialogRef = this.dialog.open(SignupConfirmationDialogComponent, {
      width: '250px',
      data: { message ,buttonName:"Go to dashboard",title:title},
      panelClass: 'custom-dialog-container', 
    });
  
    dialogRef.afterClosed().subscribe(() => {
    });
  }

  openDialog1(message: string,title:string,id:number,buttonName:string): void {
    const dialogRef = this.dialog.open(SignupConfirmationDialogComponent, {
      width: '250px',
      data: { message ,buttonName,title:title},
      panelClass: 'custom-dialog-container', 
    });
  
    dialogRef.afterClosed().subscribe(() => {
    });
  }

}

