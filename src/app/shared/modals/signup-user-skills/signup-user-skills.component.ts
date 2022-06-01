import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { switchMap, take } from 'rxjs';
import { AuthService } from 'src/app/services';
import { UserService } from 'src/app/services/user/user.service';
import { Chips } from '../../input-chips/chips';

@UntilDestroy()
@Component({
  selector: 'app-signup-user-skills',
  templateUrl: './signup-user-skills.component.html',
  styleUrls: ['./signup-user-skills.component.css']
})
export class SignupUserSkillsComponent {

  fieldsOfExpertise: Chips;
  expertiseFieldOptions: string[] = ['OOP', 'Machine Learning', 'Computer Science'];
  toolsAndLanguages: Chips;
  toolsAndLanguagesOptions: string[] = ['C++', 'Javascript', 'Java', 'Nodejs', 'Angular', 'Java', 'React'];
  personalSkills: Chips;
  personalSkillsOptions: string[] = ['Teamwork', 'Time management', 'Good Leader', 'Patient'];
  formGroup: FormGroup;

  constructor(private readonly userService: UserService,
    private readonly router: Router, private authService: AuthService) {
    this.formGroup = new FormGroup({
      skillsVideo: new FormControl(null, [Validators.maxLength(200)])
    });

    this.fieldsOfExpertise = {
      label: 'Fields of expertise',
      dataEntered: this.authService.userData.fieldsOfExpertise,
      dataOptions: this.expertiseFieldOptions
    };
    this.toolsAndLanguages = {
      label: 'Tools and Languages',
      dataEntered: this.authService.userData.toolsAndLanguages,
      dataOptions: this.toolsAndLanguagesOptions
    };
    this.personalSkills = {
      label: 'Personal skills',
      dataEntered: this.authService.userData.personalSkills,
      dataOptions: this.personalSkillsOptions
    };
  }
  
  onSave() {
    let userId: string | undefined = '';
    this.storeUserData();
    console.log(this.authService.userData);

    this.userService.userFirebaseUid.pipe((take(1)), switchMap(uid => {
      userId = uid;
      return this.userService.createUser({ ...this.authService.userData }, uid);
    }), untilDestroyed(this)).subscribe(_ => {
      this.router.navigate(['profile', this.authService.userId]);
      this.authService.isLoggedIn = true;
      this.authService.userId = userId;
      this.authService.user.subscribe(userToken => {
        this.authService.userToken = userToken;
        localStorage.setItem('userData', JSON.stringify(userToken));
      });
    });
  }

  onExit() {
    this.router.navigate(['']);
  }

  private storeUserData() {
    const data = this.formGroup.getRawValue();
    this.authService.userData.skillsVideo = data.skillsVideo;
  }
}
