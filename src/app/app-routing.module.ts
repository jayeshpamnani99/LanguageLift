import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './component/signup/signup.component';
import { LoginComponent } from './component/login/login.component';
// import { DashboardInstructorComponent } from './dashboard-instructor/dashboard-instructor.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { StudentDashboardComponent } from './component/student-dashboard/student-dashboard.component';
import { StudentCourseViewComponent } from './component/student-course-view/student-course-view.component';
import { ViewCourseModuleComponent } from './component/view-course-module/view-course-module.component';
import { ViewQuizModuleComponent } from './component/view-quiz-module/view-quiz-module.component';
import { TeacherDashboardComponent } from './component/teacher-dashboard/teacher-dashboard.component';
import { TeacherCourseViewComponent } from './component/teacher-course-view/teacher-course-view.component';
import { InstructorQuizViewComponent } from './component/instructor-quiz-view/instructor-quiz-view.component';

const routes: Routes = [{
  path:'signup',
  component:SignupComponent
},
{
  path:'login',
  component:LoginComponent
},
// {
//   path:'dashboard',
//   component:DashboardInstructorComponent
// },
{ 
  path: 'course/:id', 
  component: CourseDetailsComponent },
  {
    path: 'student-course/:id', 
    component: CourseDetailsComponent 
  },
  {
    path: 'student-dashboard',
    component: StudentDashboardComponent
  },
  {
    path: 'student-course-view/:id',
    component: StudentCourseViewComponent
  },
  {
    path: 'moduleView/:id',
    component: ViewCourseModuleComponent
  },
  {
    path: 'quizView/:id',
    component: ViewQuizModuleComponent
  },
  {path:'teacher-dashboard',
  component:TeacherDashboardComponent},
  {
    path: 'teacher-course-view/:id', 
    component: TeacherCourseViewComponent
  },
  {
    path: 'teacher-course/:courseId/module/:moduleId',
    component:InstructorQuizViewComponent
  }
  ,
{
  path:'',
  redirectTo:'/login',
  pathMatch:'full'
},

{
  path:'**',
  redirectTo:'/login',
  pathMatch:'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
