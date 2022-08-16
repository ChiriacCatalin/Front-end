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
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { CompanyProfileComponent, HomeComponent, JobsComponent, LoginComponent, ProfileMiniDataComponent } from './pages';
import { HttpClientModule } from '@angular/common/http';
import { CompanyMainInfoComponent } from './pages/company-profile/company-main-info';
import { CompanyAboutComponent } from './pages/company-profile/company-about';
import { SignInComponent } from './pages/sign-in';
import { SignUpCompanyComponent } from './pages/sign-up-company/sign-up-company.component';
import { CompanyJobsListingComponent } from './pages/company-profile/company-jobs-listing/company-jobs-listing.component';
import { JobContentComponent } from './pages/company-profile/company-jobs-listing/job-content/job-content.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FiltersComponent } from './pages/jobs/filters/filters.component';

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
    CompanyProfileComponent,
    CompanyMainInfoComponent,
    CompanyAboutComponent,
    CompanyJobsListingComponent,
    JobContentComponent,
    SignInComponent,
    SignUpCompanyComponent,
    ProfileMiniDataComponent,
    FiltersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    SharedModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
