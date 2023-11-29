import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { TeacherCourseViewComponent } from './teacher-course-view.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CourseService } from 'src/app/services/course.service';
import { LocalStorageService } from 'src/app/local-storage.service';
import { of } from 'rxjs';
import { SignupConfirmationDialogComponent } from '../signup-confirmation-dialog/signup-confirmation-dialog.component';

describe('TeacherCourseViewComponent', () => {
  let component: TeacherCourseViewComponent;
  let fixture: ComponentFixture<TeacherCourseViewComponent>;
  let mockCourseService: jasmine.SpyObj<CourseService>;
  let mockActivatedRoute: any;
  let mockRouter: any;
  let mockDialog: any;
  let mockLocalStorageService: any;

  beforeEach(waitForAsync(() => {
    mockCourseService = jasmine.createSpyObj('CourseService', ['getCoursesByTeacherId', 'getCourseModuleDetails']);
    mockActivatedRoute = { snapshot: { params: { id: '1' } } };
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockLocalStorageService = jasmine.createSpyObj('LocalStorageService', ['get']);

    TestBed.configureTestingModule({
      declarations: [TeacherCourseViewComponent],
      providers: [
        { provide: CourseService, useValue: mockCourseService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: MatDialog, useValue: mockDialog },
        { provide: LocalStorageService, useValue: mockLocalStorageService },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherCourseViewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should fetch course details and module details on ngOnInit', () => {
    const mockCourses = [{ id: 1, title: 'Course 1' }];
    const mockModuleDetails = [{ id: 1, title: 'Module 1' }];

    mockCourseService.getCoursesByTeacherId.and.returnValue(of({ courseDetails: mockCourses, userDetails: {} }));
    mockCourseService.getCourseModuleDetails.and.returnValue(of(mockModuleDetails));
    mockLocalStorageService.get.and.returnValue('dummyToken'); // Assuming token is present

    component.ngOnInit();

    expect(mockCourseService.getCoursesByTeacherId).toHaveBeenCalled();
    expect(mockCourseService.getCourseModuleDetails).toHaveBeenCalledWith(1);
    expect(component.courseIdDetails).toEqual(mockCourses[0]);
    expect(component.courseModulesDetails).toEqual(mockModuleDetails);
  });

  // it('should navigate to teacher-dashboard if user is a student', () => {
  //   // Arrange
  //   mockLocalStorageService.get.and.returnValue('dummyToken'); // Assuming token is present
  //   mockLocalStorageService.get.and.returnValue('1'); // Assuming role is student

  //   const dialogRef = mockDialog.open(SignupConfirmationDialogComponent, {
  //     width: '250px',
  //     data: { message: 'You do not have permission to view the student dashboard', buttonName: 'Go to dashboard', title: 'Logged in as Student'},
  //     panelClass: 'custom-dialog-container',
  //   });

  //   component.ngOnInit();

  //   // Assert
  //   expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/teacher-dashboard');
  //   dialogRef.afterClosed().subscribe(() => {});
  // });
  

  // it('should navigate to teacher-dashboard if course is not found', () => {
  //   const mockCourses = [];
  //   mockCourseService.getCoursesByTeacherId.and.returnValue(of({ courseDetails: mockCourses, userDetails: {} }));
  //   mockLocalStorageService.get.and.returnValue('dummyToken'); // Assuming token is present

  //   component.ngOnInit();

  //   expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/teacher-dashboard');
  // });

  // it('should open dialog when course is not taught by the teacher', fakeAsync(() => {
  //   const mockCourses: never[] = [];
  //   mockCourseService.getCoursesByTeacherId.and.returnValue(of({ courseDetails: [], userDetails: {} }));
  //   mockLocalStorageService.get.and.returnValue('dummyToken'); // Assuming token is present

  //   component.ngOnInit();
  //   tick();
  //   fixture.detectChanges();
  //   expect(mockDialog.open).toHaveBeenCalled();

  // }));

  

});