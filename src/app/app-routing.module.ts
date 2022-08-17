import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardCompanyService } from './guards/auth-guard-company.service';
import { AuthGuardService } from './guards/auth-guard.service';
import { OtherPagesGuardService } from './guards/other-pages-guard.service';
import { SignInPageGuardService } from './guards/sign-in-page-guard.service.ts.service';
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
    component: UserProfileComponent,
    canActivate: [OtherPagesGuardService]
  },
  {
    path: 'jobs',
    component: JobsComponent,
    canActivate: [OtherPagesGuardService]
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
    component: SignInComponent,
    canActivate: [SignInPageGuardService]
  },
  {
    path: 'company/:companyId',
    component: CompanyProfileComponent,
    canActivate: [OtherPagesGuardService]
  },
  {
    path: '**',
    component: SignInComponent,
    canActivate: [SignInPageGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
