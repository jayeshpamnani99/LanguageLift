import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { CourseModel } from 'src/app/Models/courseModel';

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

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.loadAllCourses();
  }

  loadAllCourses() {
    this.courseService.getUnenrolledCourses().subscribe(
      (courses) => {
        console.log(courses);
        this.courses = courses.courseDetails;
      },
      (      error: any) => {
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
      },
      (error) => {
        console.error('Error enrolling course:', error);
      }
    );
    }
    else{

    }


  }
}
