import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { LoginComponent } from './pages';
import { HomeComponent } from './pages/home/home.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'profile/:userId',
    component: UserProfileComponent
  },
  {
    path: 'jobs',
    component: JobsComponent
  },
  {
    path: 'sign-In',
    component: LoginComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
