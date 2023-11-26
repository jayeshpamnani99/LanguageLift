import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ModuleModel } from 'src/app/Models/moduleModel';
import { CourseService } from 'src/app/services/course.service';


@Component({
  selector: 'app-view-course-module',
  templateUrl: './view-course-module.component.html',
  styleUrls: ['./view-course-module.component.css']
})
export class ViewCourseModuleComponent {

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    ) { }

    moduleDetails: any;


    pdfUrl = 'file:///C:/Users/anjan/Downloads/Exercise_7%20(2).pdf';
    

  ngOnInit(): void {
    const moduleId = +this.route.snapshot.params['id'];


    this.courseService.getModuleDetailsFull(moduleId).subscribe(
      details => {
        this.moduleDetails = details;
        console.log(this.moduleDetails);
      },
      error => {
        console.error('Error fetching module details:', error);
      }      
    );
  
  }







}
