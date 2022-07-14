import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { CompanyProfileComponent, LoginComponent } from './pages';
import { HomeComponent } from './pages/home/home.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { SignInComponent } from './pages/sign-in';
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
    path: 'sign-Up',
    component: LoginComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'sign-In',
    component: SignInComponent
  },
  {
    path: 'company/:companyId',
    component: CompanyProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
