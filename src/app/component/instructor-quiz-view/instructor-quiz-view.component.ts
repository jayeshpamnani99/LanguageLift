import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/local-storage.service';
import { CourseService } from 'src/app/services/course.service';
import { QuizServiceService } from 'src/app/services/quiz-service.service';
import { SignupConfirmationDialogComponent } from '../signup-confirmation-dialog/signup-confirmation-dialog.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-instructor-quiz-view',
  templateUrl: './instructor-quiz-view.component.html',
  styleUrls: ['./instructor-quiz-view.component.css']
})
export class InstructorQuizViewComponent {



  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router:Router,
    private dialog: MatDialog,
    private localstorage:LocalStorageService,
    private quizService:QuizServiceService,
    private sanitizer: DomSanitizer
  ) {}

  quizDetails:any;
  areThereQuizes:boolean=true;
  contentURL:any;


  ngOnInit():void{

    const moduleId = +this.route.snapshot.params['moduleId']; // '+' to convert string to number
    const courseId = +this.route.snapshot.params['courseId']; // '+' to convert string to number

    console.log("moduleId: "+moduleId+" courseId: "+courseId);
    this.courseService.getModuleDetailsFull(moduleId).subscribe(
      details => {
        console.log("njws",this.sanitizer.bypassSecurityTrustResourceUrl(details.contentUrl));
        this.sanitizer.bypassSecurityTrustResourceUrl(details.contentUrl)
        this.contentURL = this.sanitizer.bypassSecurityTrustResourceUrl(details.contentUrl);
      },
      error => {
        console.error('Error fetching module details:', error);
      }      
    );


    this.quizService.getQuizSubmissionsForGrading(moduleId,courseId).subscribe(
      (quiz) => {
        console.log(quiz);
        this.quizDetails=quiz;
        console.log("this",this.quizDetails);
        // this.contentURL=this.sanitizer.bypassSecurityTrustResourceUrl(this.quizDetails.contentUrl);
        if (this.quizDetails==null || this.quizDetails==undefined||this.quizDetails==""||(Object.keys(this.quizDetails).length === 0)){
          this.areThereQuizes=false;
          console.log("No quizes to grade");
        }
      },
      (error: any) => {
        console.error('Error fetching my enrolled courses:', error);
      }
    );
  }

  onGradeClick(quizId:number,grade:number){
    console.log("quizId: "+quizId+" grade: "+grade);
    this.quizService.postQuizMarks(quizId,grade).subscribe(
      (quiz:any) => {
        console.log(quiz);
        if (quiz.message=="Quiz graded successfully!"){
          this.openDialog(quiz.message,'Confirmation',0,"Ok");
        }
        else{
          this.openDialog(quiz.message,'Error',0,"Try Again");
        }
      },
      (error: any) => {
        this.openDialog('Error grading quiz','Error',0,"Try Again");
      }
    );
  }


  
// {submission: {…}, message: 'Quiz graded successfully!'}
// message
// : 
// "Quiz graded successfully!"
// submission
// : 
// {id: 22, moduleId: 4, courseId: 25, studentId: 31, submissionStatusId: 2, …}
// [[Prototype]]
// : 
// Object

  openDialog(message: string,title:string,id:number,buttonName:string): void {
    const dialogRef = this.dialog.open(SignupConfirmationDialogComponent, {
      width: '250px',
      data: { message ,buttonName,title:title},
      panelClass: 'custom-dialog-container', 
    });
  
    dialogRef.afterClosed().subscribe(() => {
      // this.router.navigateByUrl("/teacher-dashboard");
    });
  }


}
