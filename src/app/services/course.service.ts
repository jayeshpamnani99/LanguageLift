// src/app/course.service.ts
import { Injectable } from '@angular/core';
import { CourseModel } from '../Models/courseModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { Observable, map } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  emsUrl = `${environment.apiBaseUrl}${environment.emsPort}`;
  private unenrolledCoursesUrl = this.emsUrl+`/getNotEnrolledCoursesByStuId`; 
  private myCoursesUrl = this.emsUrl+`/getEnrolledCoursesByStuId`; 
  private courseDetailsUrl = this.emsUrl+`/getCourseModuleDetails`;
  private httpOptions :any;

  constructor(private http: HttpClient,private localStorageService:LocalStorageService) {}

  getHttpOptionsWithToken() {
    console.log('gere '+this.localStorageService.get('token'));
    return {headers: new HttpHeaders({
      'Authorization': this.localStorageService.get('token')
    })}
  }

  

  getUnenrolledCourses(): Observable<any> {
    this.httpOptions = this.getHttpOptionsWithToken();
    console.log(this.httpOptions)
    console.log(this.http.get<CourseModel[]>(this.myCoursesUrl, this.httpOptions));
    return this.http.get<any>(this.unenrolledCoursesUrl, this.httpOptions);
  }

  getMyCourses(): Observable<any> {
    this.httpOptions = this.getHttpOptionsWithToken();
    console.log(this.http.get<CourseModel[]>(this.myCoursesUrl, this.httpOptions));
    return this.http.get<any>(this.myCoursesUrl, this.httpOptions);
  }

  // getCourseById(id: number): Observable<CourseModel | undefined> {
  //   return this.getUnenrolledCourses().pipe(
  //     map(courses => courses.find(course => course.id === id))
  //   );
  // }

  getCourseModuleDetails(courseId: number): Observable<any> {
    this.httpOptions = this.getHttpOptionsWithToken();
    const url = `${this.courseDetailsUrl}?courseId=${courseId}`;
    return this.http.get<any>(url, this.httpOptions);
  }

  enrollCourse(courseId: number): Observable<any> {
    this.httpOptions = this.getHttpOptionsWithToken();
    const url = `${this.emsUrl}/enroll?courseId=${courseId}`;
    // enroll?courseId=2'
    console.log(url);
    return this.http.get<any>(url, this.httpOptions);
  }
}
