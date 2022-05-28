import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { SignInDropdownComponent } from './header/sign-in-dropdown/sign-in-dropdown.component';
import { UserWorkExperienceComponent } from './modals/user-work-experience/user-work-experience.component';
import { EditUserInfoComponent } from './modals/edit-user-info/edit-user-info.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    UserWorkExperienceComponent,
    EditUserInfoComponent
  ],
  declarations: [HeaderComponent, SignInDropdownComponent, UserWorkExperienceComponent, EditUserInfoComponent]
})
export class SharedModule { }
