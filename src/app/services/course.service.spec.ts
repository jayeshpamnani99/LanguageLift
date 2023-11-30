import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CourseService } from './course.service';
import { LocalStorageService } from '../local-storage.service';
import { CourseModel, InstructorDetails } from '../Models/courseModel';
import { environment } from 'src/environments/environments';

describe('CourseService', () => {
  let service: CourseService;
  let httpTestingController: HttpTestingController;
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService, LocalStorageService]
    });
    service = TestBed.inject(CourseService);
    httpTestingController = TestBed.inject(HttpTestingController);
    localStorageService = TestBed.inject(LocalStorageService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should fetch unenrolled courses', () => {
    const mockCourses: CourseModel[] = [/* some mock CourseModel data */];
    const mockToken = 'fake-token';
    spyOn(localStorageService, 'get').and.returnValue(mockToken);

    service.getUnenrolledCourses().subscribe(courses => {
      expect(courses).toEqual(mockCourses);
    });

    // Instead of directly using 'unenrolledCoursesUrl', we assume the URL based on the known API structure.
    const expectedUrl = `${environment.apiBaseUrl}${environment.emsPort}/getNotEnrolledCoursesByStuId`;
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');
    expect(req.request.headers.get('Authorization')).toBe(mockToken);
    req.flush(mockCourses);
  });
  // it('should return the course when the ID is found', () => {
  //   const testCourseId = 1; // Assuming this ID is supposed to be found
  //   const mockCourses: CourseModel[] = [
  //     { id: testCourseId, title: 'Test Course', instructorId:1, description: 'desc',avgDuration: 1,difficulty: 'low',instructorDetails: {encPassword: 'pwd',
  //       password: 'pwd',
  //       roleId: 1,
  //       name: 'name',
  //       roleName: 'role',
  //       id: 1,
  //       email: 'test@gmail.com',}, userDetails: {encPassword: 'pwd',
  //       password: 'pwd',
  //       roleId: 1,
  //       name: 'name',
  //       roleName: 'role',
  //       id: 1,
  //       email: 'test@gmail.com',} },
  //   ];
  //   const mockToken = 'fake-token';
  //   spyOn(localStorageService, 'get').and.returnValue(mockToken);
    
  //   // First, we need to ensure that the 'getMyCourses' method is tested
  //   service.getMyCourses().subscribe(courses => {
  //     expect(courses).toEqual(mockCourses);
  //   });

  //   const expectedUrl = '/api/my-courses-endpoint'; // Replace with the actual endpoint you expect to be called
  //   const req = httpTestingController.expectOne(request => request.urlWithParams.includes('/api/my-courses-endpoint'));
  //   expect(req.request.method).toEqual('GET');
  //   expect(req.request.headers.get('Authorization')).toBe(mockToken);
  //   req.flush(mockCourses);
  // });

  // it('should return an error message when the ID is not found', () => {
  //   const testCourseId = 999; // Assuming this ID is not supposed to be found
  //   const mockCourses: CourseModel[] = [
  //     // ... some courses, but none with the ID 999
  //   ];
  //   const mockToken = 'fake-token';
  //   spyOn(localStorageService, 'get').and.returnValue(mockToken);

  //   // First, we need to ensure that the 'getMyCourses' method is tested
  //   service.getMyCourses().subscribe();

  //   const expectedUrl = '/api/my-courses-endpoint'; // Replace with the actual endpoint you expect to be called
  //   const req = httpTestingController.expectOne(request => request.urlWithParams.includes('/api/my-courses-endpoint'));
  //   expect(req.request.method).toEqual('GET');
  //   expect(req.request.headers.get('Authorization')).toBe(mockToken);
  //   req.flush(mockCourses);
  // });


  // Add more tests here for error handling, different scenarios, etc.
});
