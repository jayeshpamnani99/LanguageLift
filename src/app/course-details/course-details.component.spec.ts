import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CourseDetailsComponent } from './course-details.component';
import { CourseService } from '../services/course.service';
import { BackButtonComponent } from '../back-button/back-button.component';

describe('CourseDetailsComponent', () => {
  let component: CourseDetailsComponent;
  let fixture: ComponentFixture<CourseDetailsComponent>;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;
  let mockCourseService: jasmine.SpyObj<CourseService>;

  beforeEach(() => {
    mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', ['paramMap']);
    mockCourseService = jasmine.createSpyObj('CourseService', ['getCourseById']);

    TestBed.configureTestingModule({
      declarations: [CourseDetailsComponent,BackButtonComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: CourseService, useValue: mockCourseService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should initialize courseId from route parameters', () => {
  //   const courseId = '1';
  //   mockActivatedRoute.paramMap.and.returnValue(of({ get: () => courseId }));

  //   component.ngOnInit();

  //   expect(component.courseId).toEqual(parseInt(courseId, 10));
  // });

  // it('should call getCourseById from CourseService when ngOnInit is called', () => {
  //   const courseId = 1;
  //   mockActivatedRoute.paramMap.and.returnValue(of({ get: () => courseId }));
  //   mockCourseService.getCourseById.and.returnValue(of({ id: courseId, name: 'Test Course' }));

  //   component.ngOnInit();

  //   expect(mockCourseService.getCourseById).toHaveBeenCalledWith(courseId);
  // });

  // it('should set courseDetails with the result from getCourseById', () => {
  //   const courseId = 1;
  //   const mockCourse = { id: courseId, name: 'Test Course' };
  //   mockActivatedRoute.paramMap.and.returnValue(of({ get: () => courseId }));
  //   mockCourseService.getCourseById.and.returnValue(of(mockCourse));

  //   component.ngOnInit();

  //   expect(component.courseDetails).toEqual(mockCourse);
  // });

  it('should display enrollment success message on enroll()', () => {
    spyOn(window, 'alert');

    component.enroll();

    expect(window.alert).toHaveBeenCalledWith('You have successfully enrolled for the course');
  });
});
