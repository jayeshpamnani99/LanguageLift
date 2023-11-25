// src/app/course.service.ts
import { Injectable } from '@angular/core';
import { CourseModel } from '../Models/courseModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  emsUrl = `${environment.apiBaseUrl}${environment.emsPort}`;
  private unenrolledCoursesUrl = this.emsUrl+`/getNotEnrolledCoursesByStuId`; 
  private myCoursesUrl = this.emsUrl+`/getEnrolledCoursesByStuId`; 
  private courseDetailsUrl = this.emsUrl+`/getCourseModuleDetails`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1IiwiZXhwIjoxNzAxNDg0NzcxLCJuYW1lIjoiTWFuYXYgR3VwdGEiLCJlbWFpbCI6Im1hbmF2Z0B1bWQuZWR1In0.-b-hMftxrzmrl8-dTTcjZUASqnALu2IeHt8B3w8eCD949OP8ZSgv1be2NPchLshQ0-Mk5AAlvy5uyTLfaMcNrA' // Replace with your token
    })
  };

  constructor(private http: HttpClient) {}

  getUnenrolledCourses(): Observable<any> {
    console.log(this.http.get<CourseModel[]>(this.unenrolledCoursesUrl, this.httpOptions));
    return this.http.get<any>(this.unenrolledCoursesUrl, this.httpOptions);
  }

  getMyCourses(): Observable<any> {
    console.log(this.http.get<CourseModel[]>(this.myCoursesUrl, this.httpOptions));
    return this.http.get<any>(this.myCoursesUrl, this.httpOptions);
  }

  // getCourseById(id: number): Observable<CourseModel | undefined> {
  //   return this.getUnenrolledCourses().pipe(
  //     map(courses => courses.find(course => course.id === id))
  //   );
  // }

  getCourseModuleDetails(courseId: number): Observable<any> {
    const url = `${this.courseDetailsUrl}?courseId=${courseId}`;
    return this.http.get<any>(url, this.httpOptions);
  }

  enrollCourse(courseId: number): Observable<any> {
    const url = `${this.emsUrl}/enroll?courseId=${courseId}`;
    // enroll?courseId=2'
    console.log(url);
    return this.http.get<any>(url, this.httpOptions);
  }
}
