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

  private allCoursesUrl = `${environment.apiBaseUrl}/getAllCourses`; 
  private myCoursesUrl = `${environment.apiBaseUrl}/getEnrolledCoursesByStuId`; 

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1IiwiZXhwIjoxNzAxNDg0NzcxLCJuYW1lIjoiTWFuYXYgR3VwdGEiLCJlbWFpbCI6Im1hbmF2Z0B1bWQuZWR1In0.-b-hMftxrzmrl8-dTTcjZUASqnALu2IeHt8B3w8eCD949OP8ZSgv1be2NPchLshQ0-Mk5AAlvy5uyTLfaMcNrA' // Replace with your token
    })
  };

  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<CourseModel[]> {
    return this.http.get<CourseModel[]>(this.allCoursesUrl, this.httpOptions);
  }

  getMyCourses(): Observable<CourseModel[]> {
    return this.http.get<CourseModel[]>(this.myCoursesUrl, this.httpOptions);
  }
  // getCourses(): Observable<CourseModel[]> {
  //   return this.http.get<any[]>(this.coursesUrl, this.httpOptions).pipe(
  //     map((response: any[]) => response.map((courseData: any) => new CourseModel(courseData)))
  //   );
  // }


  getCourseById(id: number): Observable<CourseModel | undefined> {
    return this.getAllCourses().pipe(
      map(courses => courses.find(course => course.id === id))
    );
  }

  getModules() {
    // Assume this method returns an array of week data
    return [
      { weekNumber: 1, title: 'Week 1 Title', moduleType: 'Type A' },
      { weekNumber: 2, title: 'Week 2 Title', moduleType: 'Type B' },
      // Add more data as needed
    ];
  }
}
