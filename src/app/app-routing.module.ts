import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './component/signup/signup.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardInstructorComponent } from './dashboard-instructor/dashboard-instructor.component';

const routes: Routes = [{
  path:'signup',
  component:SignupComponent
},
{
  path:'login',
  component:LoginComponent
},
{
  path:'dashboard',
  component:DashboardInstructorComponent
},
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
