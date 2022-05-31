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

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    UserWorkExperienceComponent,
    EditUserInfoComponent,
    SignupUserEducationComponent,
    SignupUserPersonalProjectsComponent
  ],
  declarations: [
    HeaderComponent,
    SignInDropdownComponent,
    UserWorkExperienceComponent,
    EditUserInfoComponent,
    SignupUserEducationComponent,
    SignupUserPersonalProjectsComponent
  ]
})
export class SharedModule { }
