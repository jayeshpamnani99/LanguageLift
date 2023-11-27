import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { SignupConfirmationDialogComponent } from '../signup-confirmation-dialog/signup-confirmation-dialog.component';
import { QuizServiceService } from 'src/app/services/quiz-service.service';

@Component({
  selector: 'app-view-quiz-module',
  templateUrl: './view-quiz-module.component.html',
  styleUrls: ['./view-quiz-module.component.css']
})
export class ViewQuizModuleComponent {
  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router:Router,
    private quizService:QuizServiceService
    ) { }

    moduleDetails: any;
    answer: any;
    
  ngOnInit(): void {
    const moduleId = +this.route.snapshot.params['id'];


    this.courseService.getModuleDetailsFull(moduleId).subscribe(
      details => {
        this.moduleDetails = details;
        console.log(this.moduleDetails);
        if (this.moduleDetails==null || this.moduleDetails==undefined||this.moduleDetails==""||(Object.keys(this.moduleDetails).length === 0)){
          this.openDialog('Not enrolled in this course','Confirmation',0);
          this.router.navigateByUrl("/student-dashboard");
        }

      },
      error => {
        console.error('Error fetching module details:', error);
        this.openDialog('Error fetching module details:','Error',0);
      }      
    );
  
  }

  openDialog(message: string,title:string,id:number): void {
    const dialogRef = this.dialog.open(SignupConfirmationDialogComponent, {
      width: '250px',
      data: { message ,buttonName:"View Course",title:title},
      panelClass: 'custom-dialog-container', 
    });
  
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigateByUrl("/student-dashboard");
    });
  }

  minTextareaRows: number = 4; // Minimum number of rows
  maxTextareaRows: number = 50; // Maximum number of rows

  // Update the number of rows based on the length of the answer
  updateTextareaRows() {
    const calculatedRows = Math.max(this.minTextareaRows, Math.ceil(this.answer.length / 50));
    this.textareaRows = Math.min(calculatedRows + 4, this.maxTextareaRows);
  }

  // Initial number of rows
  textareaRows: number = this.minTextareaRows;
  
  submitAnswer(){
    this.quizService.submitQuizDetails(this.answer,this.moduleDetails.id,this.moduleDetails.courseId).subscribe(
      (response) => {
        console.log('Submitted quiz', response);}
    );
  }
}
