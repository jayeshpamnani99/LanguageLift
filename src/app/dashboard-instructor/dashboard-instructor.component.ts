import { Component } from '@angular/core';
import { CourseModel } from '../Models/courseModel';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-dashboard-instructor',
  templateUrl: './dashboard-instructor.component.html',
  styleUrls: ['./dashboard-instructor.component.css']
})
export class DashboardInstructorComponent {

  constructor(private courseservice: CourseService) { }

  courses = this.courseservice.getCourses();

}
