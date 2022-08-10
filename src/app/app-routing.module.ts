import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardCompanyService } from './guards/auth-guard-company.service';
import { AuthGuardService } from './guards/auth-guard.service';
import { OtherPagesGuardService } from './guards/other-pages-guard.service';
import { CompanyProfileComponent, LoginComponent } from './pages';
import { HomeComponent } from './pages/home/home.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { SignInComponent } from './pages/sign-in';
import { SignUpCompanyComponent } from './pages/sign-up-company/sign-up-company.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [OtherPagesGuardService]
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
    path: 'sign-Up-company',
    component: SignUpCompanyComponent,
    canActivate: [AuthGuardCompanyService]
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
  },
  {
    path: '**',
    component: SignInComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
