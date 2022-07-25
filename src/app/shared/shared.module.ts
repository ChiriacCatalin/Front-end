import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { SignInDropdownComponent } from './header/sign-in-dropdown/sign-in-dropdown.component';
import { UserWorkExperienceComponent } from './modals/user-work-experience/user-work-experience.component';
import { EditUserInfoComponent } from './modals/edit-user-info/edit-user-info.component';
import { SignupUserEducationComponent } from './modals/signup-user-education/signup-user-education.component';
import { SignupUserPersonalProjectsComponent } from './modals/signup-user-personal-projects/signup-user-personal-projects.component';
import { SpinnerComponent } from './header/spinner/spinner.component';
import { InputChipsComponent } from './input-chips/input-chips.component';
import { MaterialModule } from '../material';
import { SignupUserSkillsComponent } from './modals/signup-user-skills/signup-user-skills.component';
import { SignupCompanyAboutComponent } from './modals/company/signup-company-about/signup-company-about.component';
import { SignupCompanyMainComponent } from './modals/company/signup-company-main/signup-company-main.component';
import { EditCompanyAboutComponent } from './modals/company/edit-company-about/edit-company-about.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent,
    UserWorkExperienceComponent,
    EditUserInfoComponent,
    SignupUserEducationComponent,
    SignupUserPersonalProjectsComponent,
    SpinnerComponent,
    InputChipsComponent,
    SignupUserSkillsComponent,
    SignupCompanyAboutComponent,
    SignupCompanyMainComponent,
    EditCompanyAboutComponent
  ],
  declarations: [
    HeaderComponent,
    SignInDropdownComponent,
    UserWorkExperienceComponent,
    EditUserInfoComponent,
    SignupUserEducationComponent,
    SignupUserPersonalProjectsComponent,
    SpinnerComponent,
    InputChipsComponent,
    SignupUserSkillsComponent,
    SignupCompanyAboutComponent,
    SignupCompanyMainComponent,
    EditCompanyAboutComponent
  ]
})
export class SharedModule { }
