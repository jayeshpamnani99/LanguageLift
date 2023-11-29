import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StudentCourseViewComponent } from './student-course-view.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CourseService } from 'src/app/services/course.service';
import { LocalStorageService } from 'src/app/local-storage.service';
import { SignupConfirmationDialogComponent } from '../signup-confirmation-dialog/signup-confirmation-dialog.component';



describe('StudentCourseViewComponent', () => {
  let component: StudentCourseViewComponent;
  let fixture: ComponentFixture<StudentCourseViewComponent>;
  let mockCourseService: jasmine.SpyObj<CourseService>;
  let mockActivatedRoute: any;
  let mockRouter: any;
  let mockDialog: any;
  let mockLocalStorageService: any;

  beforeEach(waitForAsync(() => {
    mockCourseService = jasmine.createSpyObj('CourseService', ['getMyCourses', 'getCourseModuleDetails']);
    mockActivatedRoute = { snapshot: { params: { id: '1' } } };
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockLocalStorageService = jasmine.createSpyObj('LocalStorageService', ['get']);

    TestBed.configureTestingModule({
      declarations: [StudentCourseViewComponent],
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
    fixture = TestBed.createComponent(StudentCourseViewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch course details and module details on ngOnInit', () => {
    const mockCourses = [{ id: 1, title: 'Course 1' }];
    const mockModuleDetails = [{ id: 1, title: 'Module 1' }];

    mockCourseService.getMyCourses.and.returnValue(of({ courseDetails: mockCourses }));
    mockCourseService.getCourseModuleDetails.and.returnValue(of(mockModuleDetails));
    mockLocalStorageService.get.and.returnValue('dummyToken'); // Assuming token is present

    component.ngOnInit();

    expect(mockCourseService.getMyCourses).toHaveBeenCalled();
    expect(mockCourseService.getCourseModuleDetails).toHaveBeenCalledWith(1);
    expect(component.courseIdDetails).toEqual(mockCourses[0]);
    expect(component.courseModulesDetails).toEqual(mockModuleDetails);
  });




  // it('should navigate to student-dashboard if user is not logged in', () => {
  //   mockLocalStorageService.get.and.returnValue(null); // Simulate user not logged in

  //   component.ngOnInit();

  //   expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/login');
  // });

  // it('should navigate to teacher-dashboard if user is a teacher', () => {
  //   mockLocalStorageService.get.and.returnValue('dummyToken'); // Assuming token is present
  //   mockLocalStorageService.get.and.returnValue('2'); // Assuming role is teacher

  //   component.ngOnInit();

  //   expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/teacher-dashboard');
  // });

});
