// student-course-view.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseModel } from 'src/app/Models/courseModel';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-student-course-view',
  templateUrl: './student-course-view.component.html',
  styleUrls: ['./student-course-view.component.css']
})
export class StudentCourseViewComponent implements OnInit {
  courseModulesDetails: any; // Replace 'any' with the appropriate type for your course modules
  courseIdDetails: any;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {
    const courseId = +this.route.snapshot.params['id']; // '+' to convert string to number
    
    this.courseService.getMyCourses().subscribe(
      (courses) => {
        console.log(courses);
        courses = courses.courseDetails;
        this.courseIdDetails = courses.find((course: CourseModel) => course.id === courseId);
        if (courseId) {
          console.log(courseId);
        } else {
          this.router.navigateByUrl("/student-dashboard");
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
}
