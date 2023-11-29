// Import necessary modules and classes
import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TeacherDashboardComponent } from './teacher-dashboard.component';
import { CourseService } from 'src/app/services/course.service';
import { SignupConfirmationDialogComponent } from '../signup-confirmation-dialog/signup-confirmation-dialog.component';
import { LocalStorageService } from 'src/app/local-storage.service';
import { of } from 'rxjs';
import { Router as AngularRouter } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { waitForAsync } from '@angular/core/testing';

describe('TeacherDashboardComponent', () => {
  let component: TeacherDashboardComponent;
  let fixture: ComponentFixture<TeacherDashboardComponent>;
  let mockCourseService: jasmine.SpyObj<CourseService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockLocalStorage: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    // ... (Same setup as before)

    TestBed.configureTestingModule({
      declarations: [TeacherDashboardComponent],
      providers: [
        { provide: CourseService, useValue: mockCourseService },
        { provide: MatDialog, useValue: mockDialog },
        { provide: Router, useValue: mockRouter },
        { provide: LocalStorageService, useValue: mockLocalStorage }
      ]
    });

    fixture = TestBed.createComponent(TeacherDashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });



  it('should show all courses when calling showAllCourses()', () => {
    component.viewAllCourses = false;
    component.loadAllCourses = jasmine.createSpy('loadAllCourses');

    component.showAllCourses();

    expect(component.viewAllCourses).toBeTrue();
    expect(component.loadAllCourses).toHaveBeenCalled();
    expect(component.buttonType).toBe('Enroll');
  });

  // ...

  // describe('TeacherDashboardComponent', () => {
  //   let component: TeacherDashboardComponent;
  //   let fixture: ComponentFixture<TeacherDashboardComponent>;
  //   let mockCourseService: jasmine.SpyObj<CourseService>;
  //   let mockDialog: jasmine.SpyObj<MatDialog>;
  //   let mockRouter: jasmine.SpyObj<Router>;

  //   // ...

  //   beforeEach(waitForAsync(() => {
  //     // ...

  //     TestBed.configureTestingModule({
  //       declarations: [TeacherDashboardComponent],
  //       providers: [
  //         { provide: CourseService, useValue: mockCourseService },
  //         { provide: MatDialog, useValue: mockDialog },
  //         { provide: Router, useValue: mockRouter },
  //         { provide: LocalStorageService, useValue: mockLocalStorage }
  //       ],
  //       imports: [
  //         HttpClientTestingModule, // Provide HttpClient for testing
  //         RouterTestingModule,     // Mocks the router
  //         MatDialogModule,         // Mocks MatDialog
  //         ReactiveFormsModule     // Provides FormBuilder for testing
  //       ]
  //     }).compileComponents();
  //     // ...
  //   }));

  //   beforeEach(() => {
  //     fixture = TestBed.createComponent(TeacherDashboardComponent);
  //     component = fixture.componentInstance;
  //     fixture.detectChanges();
  //   });

  //   // ...

  //   // it('should call buttonClick method on button click', () => {
  //   //   spyOn(component, 'buttonClick'); // Spy on the buttonClick method

  //   //   const button = fixture.debugElement.nativeElement.querySelector('.course-enroll-button');
  //   //   button.click();

  //   //   expect(component.buttonClick).toHaveBeenCalled(); // Verify that the method was called
  //   // });
  //   // it('11111should call buttonClick method on button click', () => {
  //   //   spyOn(component, 'buttonClick'); // Spy on the buttonClick method

  //   //   const button = fixture.debugElement.nativeElement.querySelector('.course-enroll-button');
  //   //   button.click();

  //   //   expect(component.buttonClick).toHaveBeenCalledWith(1)// Verify that the method was called with the correct parameter
  //   // });

    


  // });

  // Add more test cases as needed

  it('should call showAllCourses method on button click', () => {
    spyOn(component, 'showAllCourses'); // Spy on the showAllCourses method

    const button = fixture.debugElement.nativeElement.querySelector('.nav-link'); // Adjust the selector based on your actual HTML structure
    button.click();

    expect(component.showAllCourses).toHaveBeenCalled(); // Verify that the method was called
  });

  
  
});
