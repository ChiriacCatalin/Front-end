import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditButtonComponent } from './shared/buttons/edit-button/edit-button.component';
import { EditWorkExperienceComponent } from './shared/buttons/edit-work-experience/edit-work-experience.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserMainInfoComponent } from './pages/user-profile/user-main-info/user-main-info.component';
import { WorkExperienceComponent } from './pages/user-profile/work-experience/work-experience.component';
import { UserEducationComponent } from './pages/user-profile/user-education/user-education.component';
import { UserSkillsComponent } from './pages/user-profile/user-skills/user-skills.component';
import { UserHobbiesComponent } from './pages/user-profile/user-hobbies/user-hobbies.component';
import { UserPersonalProjectsComponent } from './pages/user-profile/user-personal-projects/user-personal-projects.component';
import { HomeComponent } from './pages/home/home.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    UserMainInfoComponent,
    WorkExperienceComponent,
    UserEducationComponent,
    UserSkillsComponent,
    UserHobbiesComponent,
    UserPersonalProjectsComponent,
    EditButtonComponent,
    EditWorkExperienceComponent,
    HomeComponent,
    JobsComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
