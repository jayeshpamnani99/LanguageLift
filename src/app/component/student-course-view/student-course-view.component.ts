import { Component } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-student-course-view',
  templateUrl: './student-course-view.component.html',
  styleUrls: ['./student-course-view.component.css']
})
export class StudentCourseViewComponent {


  modules: any[] = [];

  constructor(private courseservice: CourseService) {}

  ngOnInit(): void {
    this.modules = this.courseservice.getModules();
  }
}