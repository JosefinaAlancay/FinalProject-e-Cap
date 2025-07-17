import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { RegisterComponent } from './pages/register/register';
import { LoginComponent } from './pages/login/login';
import { CourseDetail } from './pages/course-detail/course-detail';
import { CourseList } from './pages/courses-list/courses-list';
import { TopCourses } from './components/top-courses/top-courses';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'courses/:id', component: CourseDetail },
    { path: 'courses', component: CourseList },
    { path: 'top-courses', component: TopCourses },

];
