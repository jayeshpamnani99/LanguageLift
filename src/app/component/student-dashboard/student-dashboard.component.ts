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

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.courseService.getCourses().subscribe(
      (courses: CourseModel[]) => {
        this.courses = courses;
      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }
}
