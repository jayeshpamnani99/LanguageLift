// src/app/course.service.ts
import { Injectable } from '@angular/core';
import { CourseModel } from '../Models/courseModel';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courses: CourseModel[] = [
    new CourseModel(1,'Introduction to Angular', 'Learn the basics of Angular framework.'),
    new CourseModel(2,'Introduction to Angular', 'Learn the basics of Angular framework.'),
    new CourseModel(3,'Advanced JavaScript', 'Deep dive into JavaScript concepts and features.'),
    new CourseModel(4,'Web Development with Angular', 'Build modern web applications with Angular.'),
    new CourseModel(5,'Web Development with Angular', 'Build modern web applications with Angular.'),
    new CourseModel(6,'Web Development with Angular', 'Build modern web applications with Angular.'),
      // Add more courses as needed
  ];

  getCourses(): CourseModel[] {
    return this.courses;
  }

  getCourseById(id: number): CourseModel | undefined {
    return this.courses.find(course => course.id === id);
  }
  // private courses: CourseModel[] = [
  //   { id: 1, title: 'Angular Basics', description: 'Introduction to Angular', instructor: 'John Doe' },
  //   { id: 2, title: 'Advanced Angular', description: 'Advanced Angular concepts', instructor: 'Jane Smith' },
  // ];

  // getCourses(): Course[] {
  //   return this.courses;
  // }

  // getCourseById(id: number): Course | undefined {
  //   return this.courses.find(course => course.id === id);
  // }
}
