import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StudentDashboardComponent } from './student-dashboard.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { CourseService } from 'src/app/services/course.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('StudentDashboardComponent', () => {
  let component: StudentDashboardComponent;
  let fixture: ComponentFixture<StudentDashboardComponent>;
  let mockCourseService: jasmine.SpyObj<CourseService>;

  beforeEach(waitForAsync(() => {
    mockCourseService = jasmine.createSpyObj('CourseService', ['getUnenrolledCourses', 'getMyCourses', 'enrollCourse']);
    mockCourseService.getUnenrolledCourses.and.returnValue(of({ courseDetails: [] }));
    mockCourseService.getMyCourses.and.returnValue(of({ courseDetails: [] }));
    mockCourseService.enrollCourse.and.returnValue(of({}));

    TestBed.configureTestingModule({
      declarations: [StudentDashboardComponent],
      imports: [MatDialogModule, RouterTestingModule],
      providers: [{ provide: CourseService, useValue: mockCourseService }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set viewAllCourses to true and load all courses on showAllCourses button click', () => {
    spyOn(component, 'loadAllCourses');
    component.viewAllCourses = false;

    const allCoursesButton = fixture.debugElement.nativeElement.querySelector('.nav-link:first-child');
    allCoursesButton.click();

    expect(component.viewAllCourses).toBe(true);
    expect(component.loadAllCourses).toHaveBeenCalled();
  });

  it('should set viewAllCourses to false and load my courses on showMyCourses button click', () => {
    spyOn(component, 'loadMyCourses');
    component.viewAllCourses = true;

    const myCoursesButton = fixture.debugElement.nativeElement.querySelector('.nav-link:nth-child(2)');
    myCoursesButton.click();

    expect(component.viewAllCourses).toBe(true);
    expect(component.loadMyCourses).toHaveBeenCalled();
  });

  it('should call enrollCourse on buttonClick when buttonType is "Enroll"', () => {
    component.buttonType = 'Enroll';
  
    const courseId = 1;
    component.buttonClick(courseId);
  
    expect(component['courseService'].enrollCourse).toHaveBeenCalledWith(courseId);
  });

  // ...

  it('should navigate to student-course-view on buttonClick when buttonType is not "Enroll"', () => {
    component.buttonType = 'View this Course';

    const courseId = 1;
    const router = TestBed.inject(Router);
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl');

    component.buttonClick(courseId);

    expect(navigateByUrlSpy).toHaveBeenCalledWith('/student-course-view/' + courseId);
  });
});
