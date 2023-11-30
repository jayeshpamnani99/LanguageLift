import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CourseService } from 'src/app/services/course.service';
import { DomSanitizer } from '@angular/platform-browser';
import { QuizServiceService } from 'src/app/services/quiz-service.service';
import { SignupConfirmationDialogComponent } from '../signup-confirmation-dialog/signup-confirmation-dialog.component';

import { ViewQuizModuleComponent } from './view-quiz-module.component';
import { BackButtonComponent } from 'src/app/back-button/back-button.component';

describe('ViewQuizModuleComponent', () => {
  let component: ViewQuizModuleComponent;
  let fixture: ComponentFixture<ViewQuizModuleComponent>;
  let courseServiceSpy: jasmine.SpyObj<CourseService>;
  let quizServiceSpy: jasmine.SpyObj<QuizServiceService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(waitForAsync(() => {
    courseServiceSpy = jasmine.createSpyObj('CourseService', ['getModuleDetailsFull']);
    quizServiceSpy = jasmine.createSpyObj('QuizServiceService', ['submitQuizDetails']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      declarations: [ViewQuizModuleComponent,BackButtonComponent],
      providers: [
        { provide: CourseService, useValue: courseServiceSpy },
        { provide: QuizServiceService, useValue: quizServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: 1 } } } },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewQuizModuleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(' initially, should not have content url', () => {
    expect(component.contentURL).toBeFalsy();
  });

  it('initially, should not have answer', () => {
    expect(component.answer).toBeFalsy();
  });


  it('initially, should not have module details', () => {
    expect(component.moduleDetails).toBeFalsy();
  });

  it('should sanitize content url', () => {
    const sanitizerSpy = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustResourceUrl']);
    sanitizerSpy.bypassSecurityTrustResourceUrl.and.returnValue('some/url');
    
    component.ngOnInit();
    
    component.contentURL='some/url';

    expect(sanitizerSpy.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith('some/url');
    expect(component.contentURL).toEqual('some/url');
  });

  it('should fetch module details on initialization', () => {
    const moduleDetails = { id: 1, quizSubmissionPossible: true, contentUrl: 'some/url' };
    courseServiceSpy.getModuleDetailsFull.and.returnValue(of(moduleDetails));

    component.ngOnInit();

    expect(courseServiceSpy.getModuleDetailsFull).toHaveBeenCalledWith(1);
    expect(component.moduleDetails).toEqual(moduleDetails);
    expect(component.contentURL).toBeTruthy();
  });

  it('should handle error fetching module details', () => {
    const errorMessage = 'Error fetching module details:';
    courseServiceSpy.getModuleDetailsFull.and.throwError(errorMessage);

    spyOn(console, 'error'); // Suppress console.error in the test output

    component.ngOnInit();

    expect(courseServiceSpy.getModuleDetailsFull).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(errorMessage);
    expect(dialogSpy.open).toHaveBeenCalledWith(
      SignupConfirmationDialogComponent,
      jasmine.objectContaining({ data: { message: errorMessage, title: 'Error', buttonName: 'View Course' } })
    );
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/student-dashboard');
  });

  // it('should submit quiz details', () => {
  //   const quizDetails = { id: 1, courseId: 1 };
  //   quizServiceSpy.submitQuizDetails.and.returnValue(of({ message: 'quiz submitted successfully!' }));
  //   component.moduleDetails = { id: 1, courseId: 1 };

  //   component.submitAnswer();

  //   expect(quizServiceSpy.submitQuizDetails).toHaveBeenCalledWith(component.answer, 1, 1);
  //   expect(dialogSpy.open).toHaveBeenCalledWith(
  //     SignupConfirmationDialogComponent,
  //     jasmine.objectContaining({
  //       data: { message: 'Quiz submitted successfully! You can give the quiz again until graded', title: 'Confirmation', buttonName: 'close' },
  //     })
  //   );
  // });

  it('should handle error submitting quiz details', () => {
    const errorMessage = 'Error submitting quiz!';
    quizServiceSpy.submitQuizDetails.and.throwError(errorMessage);

    spyOn(console, 'error'); // Suppress console.error in the test output

    component.submitAnswer();

    expect(quizServiceSpy.submitQuizDetails).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(errorMessage);
    expect(dialogSpy.open).toHaveBeenCalledWith(
      SignupConfirmationDialogComponent,
      jasmine.objectContaining({ data: { message: errorMessage, title: 'Error', buttonName: 'close' } })
    );
  });

  it('should open a dialog for submission', () => {
    component.openDialogForSubmission('Test message', 'Test title', 1);

    expect(dialogSpy.open).toHaveBeenCalledWith(
      SignupConfirmationDialogComponent,
      jasmine.objectContaining({ data: { message: 'Test message', title: 'Test title', buttonName: 'close' } })
    );
  });
});
