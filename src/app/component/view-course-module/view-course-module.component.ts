import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ModuleModel } from 'src/app/Models/moduleModel';
import { CourseService } from 'src/app/services/course.service';
import { SignupConfirmationDialogComponent } from '../signup-confirmation-dialog/signup-confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-view-course-module',
  templateUrl: './view-course-module.component.html',
  styleUrls: ['./view-course-module.component.css']
})
export class ViewCourseModuleComponent {

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router:Router,
    private sanitizer: DomSanitizer
    ) { }

    moduleDetails: any;
    contentURL:any;
    

  ngOnInit(): void {
    const moduleId = +this.route.snapshot.params['id'];


    this.courseService.getModuleDetailsFull(moduleId).subscribe(
      details => {
        this.moduleDetails = details;
        this.contentURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.moduleDetails.contentUrl);
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
}
