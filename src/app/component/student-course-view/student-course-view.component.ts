// student-course-view.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-student-course-view',
  templateUrl: './student-course-view.component.html',
  styleUrls: ['./student-course-view.component.css']
})
export class StudentCourseViewComponent implements OnInit {
  courseModulesDetails: any; // Replace 'any' with the appropriate type for your course modules

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const courseId = +this.route.snapshot.params['id']; // '+' to convert string to number
    this.courseService.getCourseModuleDetails(courseId).subscribe(
      details => {
        this.courseModulesDetails = details;
        // Now you have the course modules details to use in your component
      },
      error => {
        console.error('Error fetching course module details:', error);
      }
    );
  }
}
