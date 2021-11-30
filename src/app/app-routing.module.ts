import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AddTrainerComponent } from './components/add-trainer/add-trainer.component';
import { AdminComponent } from './components/admin/admin.component';
import { CountriesComponent } from './components/countries/countries.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'course', component: AddCourseComponent },
  { path: 'trainer', component: AddTrainerComponent },
  { path: 'course-info/:id', component: CourseInfoComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'edit-course/:id', component: AddCourseComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signupAdmin', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {path:'countries', component:CountriesComponent},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
