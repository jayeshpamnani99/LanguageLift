// src/app/course.service.ts
import { Injectable } from '@angular/core';
import { CourseModel } from '../Models/courseModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private coursesUrl = 'http://35.171.189.199:8082/getAllCourses'; 
  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1IiwiZXhwIjoxNzAxNDg0NzcxLCJuYW1lIjoiTWFuYXYgR3VwdGEiLCJlbWFpbCI6Im1hbmF2Z0B1bWQuZWR1In0.-b-hMftxrzmrl8-dTTcjZUASqnALu2IeHt8B3w8eCD949OP8ZSgv1be2NPchLshQ0-Mk5AAlvy5uyTLfaMcNrA' // Replace with your token
    })
  };

  constructor(private http: HttpClient) {}

  getCourses(): Observable<CourseModel[]> {
    return this.http.get<any[]>(this.coursesUrl, this.httpOptions).pipe(
      map((response: any[]) => response.map((courseData: any) => new CourseModel(courseData)))
    );
  }

  // courses: CourseModel[] = [
  //   new CourseModel(1,'Introduction to Angular', 'Learn the basics of Angular framework.'),
  //   new CourseModel(2,'Introduction to Angular', 'Learn the basics of Angular framework.'),
  //   new CourseModel(3,'Advanced JavaScript', 'Deep dive into JavaScript concepts and features.'),
  //   new CourseModel(4,'Web Development with Angular', 'Build modern web applications with Angular.'),
  //   new CourseModel(5,'Web Development with Angular', 'Build modern web applications with Angular.'),
  //   new CourseModel(6,'Web Development with Angular', 'Build modern web applications with Angular.'),
  //     // Add more courses as needed
  // ];

  // modules:{} [] = [
  //   new CourseModel(1,'Introduction to Angular', 'Learn the basics of Angular framework.'),
  //   new CourseModel(2,'Introduction to Angular', 'Learn the basics of Angular framework.'),
  //   new CourseModel(3,'Advanced JavaScript', 'Deep dive into JavaScript concepts and features.'),
  //   new CourseModel(4,'Web Development with Angular', 'Build modern web applications with Angular.'),
  //   new CourseModel(5,'Web Development with Angular', 'Build modern web applications with Angular.'),
  //   new CourseModel(6,'Web Development with Angular', 'Build modern web applications with Angular.'),
  //     // Add more courses as needed
  // ];

  // getCourses(): CourseModel[] {
  //   return this.courses;
  // }

  // getCourseById(id: number): CourseModel | undefined {
  //   return this.courses.find(course => course.id === id);
  // }
  // private courses: CourseModel[] = [
  //   { id: 1, title: 'Angular Basics', description: 'Introduction to Angular', instructor: 'John Doe' },
  //   { id: 2, title: 'Advanced Angular', description: 'Advanced Angular concepts', instructor: 'Jane Smith' },
  // ];

  // getCourses(): Course[] {
  //   return this.courses;
  // }

  getCourseById(id: number): Observable<CourseModel | undefined> {
    return this.getCourses().pipe(
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
