import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CourseService } from 'src/app/services/course.service';
import { DomSanitizer } from '@angular/platform-browser';
import { QuizServiceService } from 'src/app/services/quiz-service.service';
import { LocalStorageService } from 'src/app/local-storage.service';
import { SignupConfirmationDialogComponent } from '../signup-confirmation-dialog/signup-confirmation-dialog.component';

import { InstructorQuizViewComponent } from './instructor-quiz-view.component';
import { BackButtonComponent } from 'src/app/back-button/back-button.component';

describe('InstructorQuizViewComponent', () => {
  let component: InstructorQuizViewComponent;
  let fixture: ComponentFixture<InstructorQuizViewComponent>;
  let courseServiceSpy: jasmine.SpyObj<CourseService>;
  let quizServiceSpy: jasmine.SpyObj<QuizServiceService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let routerSpy: jasmine.SpyObj<Router>;
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;

  beforeEach(waitForAsync(() => {
    courseServiceSpy = jasmine.createSpyObj('CourseService', ['getModuleDetailsFull']);
    quizServiceSpy = jasmine.createSpyObj('QuizServiceService', ['getQuizSubmissionsForGrading', 'postQuizMarks']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', ['get']);

    TestBed.configureTestingModule({
      declarations: [InstructorQuizViewComponent,BackButtonComponent],
      providers: [
        { provide: CourseService, useValue: courseServiceSpy },
        { provide: QuizServiceService, useValue: quizServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: Router, useValue: routerSpy },
        { provide: LocalStorageService, useValue: localStorageServiceSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { params: { moduleId: 1, courseId: 1 } } } },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorQuizViewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should fetch module details and quiz submissions on initialization', () => {
  //   const moduleDetails = { id: 1, contentUrl: 'some/url' };
  //   const quizSubmissions = { marksObtained: 10 };

  //   courseServiceSpy.getModuleDetailsFull.and.returnValue(of(moduleDetails));
  //   quizServiceSpy.getQuizSubmissionsForGrading.and.returnValue(of(quizSubmissions));

  //   component.ngOnInit();

  //   expect(courseServiceSpy.getModuleDetailsFull).toHaveBeenCalledWith(1);
  //   expect(quizServiceSpy.getQuizSubmissionsForGrading).toHaveBeenCalledWith(1, 1);
  //   expect(component.contentURL).toBeTruthy();
  //   expect(component.quizDetails).toEqual(quizSubmissions);
  //   expect(component.marksObtained).toBe(true);
  // });

  it('should handle error fetching module details', () => {
    const errorMessage = 'Error fetching module details:';
    courseServiceSpy.getModuleDetailsFull.and.throwError(errorMessage);

    spyOn(console, 'error'); // Suppress console.error in the test output

    component.ngOnInit();

    expect(courseServiceSpy.getModuleDetailsFull).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(errorMessage);
  });

  it('should handle error fetching quiz submissions', () => {
    const errorMessage = 'Error fetching quiz submissions:';
    quizServiceSpy.getQuizSubmissionsForGrading.and.throwError(errorMessage);

    spyOn(console, 'error'); // Suppress console.error in the test output

    component.ngOnInit();

    expect(quizServiceSpy.getQuizSubmissionsForGrading).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(errorMessage);
  });

  // it('should handle grading quiz', () => {
  //   const quizId = 1;
  //   const grade = 10;
  //   const successMessage = 'Quiz graded successfully!';

  //   quizServiceSpy.postQuizMarks.and.returnValue(of({ message: successMessage }));

  //   component.onGradeClick(quizId, grade);

  //   expect(quizServiceSpy.postQuizMarks).toHaveBeenCalledWith(quizId, grade);
  //   expect(dialogSpy.open).toHaveBeenCalledWith(
  //     SignupConfirmationDialogComponent,
  //     jasmine.objectContaining({ data: { message: successMessage, title: 'Confirmation', buttonName: 'Ok' } })
  //   );
  //   expect(component.ngOnInit).toHaveBeenCalled(); // Assuming you want to reload data after grading
  // });

  it('should handle error grading quiz', () => {
    const quizId = 1;
    const grade = 10;
    const errorMessage = 'Error grading quiz';

    quizServiceSpy.postQuizMarks.and.throwError(errorMessage);

    spyOn(console, 'error'); // Suppress console.error in the test output

    component.onGradeClick(quizId, grade);

    expect(quizServiceSpy.postQuizMarks).toHaveBeenCalledWith(quizId, grade);
    expect(console.error).toHaveBeenCalledWith(errorMessage);
    expect(dialogSpy.open).toHaveBeenCalledWith(
      SignupConfirmationDialogComponent,
      jasmine.objectContaining({ data: { message: errorMessage, title: 'Error', buttonName: 'Try Again' } })
    );
  });

  it('should open a dialog', () => {
    const message = 'Test message';
    const title = 'Test title';
    const buttonName = 'Test button';

    component.openDialog(message, title, 1, buttonName);

    expect(dialogSpy.open).toHaveBeenCalledWith(
      SignupConfirmationDialogComponent,
      jasmine.objectContaining({ data: { message, title, buttonName } })
    );
  });
});
