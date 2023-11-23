import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  courseId: number | null = null;
  courseDetails: any;

  constructor(private route: ActivatedRoute,private courseService: CourseService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.courseId = parseInt(params.get('id')!, 10);
      this.courseDetails = this.courseService.getCourseById(this.courseId);
    });
  }

  enroll(){
    alert("You have successfully enrolled for the course");
    
  }
}
