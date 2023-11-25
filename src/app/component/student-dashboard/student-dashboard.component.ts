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

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.loadAllCourses();
  }

  loadAllCourses() {
    this.courseService.getAllCourses().subscribe(
      (courses: CourseModel[]) => {
        this.courses = courses;
      },
      (      error: any) => {
        console.error('Error fetching all courses:', error);
      }
    );
  }

  loadMyCourses() {
    this.courseService.getMyCourses().subscribe(
      (courses: CourseModel[]) => {
        this.enrolledCourses = courses;
      },
      (      error: any) => {
        console.error('Error fetching my enrolled courses:', error);
      }
    );
  }

  showAllCourses() {
    this.viewAllCourses = true;
    this.loadAllCourses();
  }

  showMyCourses() {
    this.viewAllCourses = false;
    this.loadMyCourses();
  }
}
