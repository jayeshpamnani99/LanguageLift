import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route } from '@angular/router';
import { LocalStorageService } from 'src/app/local-storage.service';
import { CourseService } from 'src/app/services/course.service';
import { QuizServiceService } from 'src/app/services/quiz-service.service';

@Component({
  selector: 'app-instructor-quiz-view',
  templateUrl: './instructor-quiz-view.component.html',
  styleUrls: ['./instructor-quiz-view.component.css']
})
export class InstructorQuizViewComponent {


  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    // private router:Route,
    private dialog: MatDialog,
    private localstorage:LocalStorageService,
    private quizService:QuizServiceService
  ) {}

  quizDetails:any;

  ngOnInit():void{

    const moduleId = +this.route.snapshot.params['moduleId']; // '+' to convert string to number
    const courseId = +this.route.snapshot.params['courseId']; // '+' to convert string to number

    console.log("moduleId: "+moduleId+" courseId: "+courseId);
    this.quizService.getQuizSubmissionsForGrading(moduleId,courseId).subscribe(
      (quiz) => {
        console.log(quiz);
        this.quizDetails=quiz;
      },
      (error: any) => {
        console.error('Error fetching my enrolled courses:', error);
      }
    );
  }

  onGradeClick(quizId:number,grade:number){
    console.log("quizId: "+quizId+" grade: "+grade);
    this.quizService.postQuizMarks(quizId,grade).subscribe(
      (quiz) => {
        console.log(quiz);
        this.quizDetails=quiz;
      },
      (error: any) => {
        console.error('Error fetching my enrolled courses:', error);
      }
    );
  }




}
