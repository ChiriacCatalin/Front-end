import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { disableDebugTools } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { from, switchMap, take } from 'rxjs';
import { AuthService } from 'src/app/services';
import { UserService } from 'src/app/services/user/user.service';
import { Chips } from '../../input-chips/chips';

@UntilDestroy()
@Component({
  selector: 'app-signup-user-skills',
  templateUrl: './signup-user-skills.component.html',
  styleUrls: ['./signup-user-skills.component.css']
})
export class SignupUserSkillsComponent implements OnChanges {
  @Input() toEdit: boolean = false;

  fieldsOfExpertise?: Chips;
  expertiseFieldOptions: string[] = ['OOP', 'Machine Learning', 'Computer Science'];
  toolsAndLanguages?: Chips;
  toolsAndLanguagesOptions: string[] = ['C++', 'Javascript', 'Java', 'Nodejs', 'Angular', 'Java', 'React'];
  personalSkills?: Chips;
  personalSkillsOptions: string[] = ['Teamwork', 'Time management', 'Good Leader', 'Patient'];
  formGroup: FormGroup;
  fieldsOfExpertise_copy?: string[];
  toolsAndLanguages_copy?: string[];
  personalSkills_copy?: string[];

  constructor(private readonly userService: UserService,
    private readonly router: Router, private authService: AuthService) {
    this.formGroup = new FormGroup({
      skillsVideo: new FormControl(null, [Validators.maxLength(200)])
    });
    if (!this.toEdit) {
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

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.toEdit) {
      let video_copy = this.authService.userData.skillsVideo;
      if (video_copy)
        this.formGroup.setValue({ 'skillsVideo': video_copy });
      this.fieldsOfExpertise_copy = this.authService.userData.fieldsOfExpertise ? this.authService.userData.fieldsOfExpertise.slice() : [];
      this.toolsAndLanguages_copy = this.authService.userData.toolsAndLanguages ? this.authService.userData.toolsAndLanguages.slice() : [];
      this.personalSkills_copy = this.authService.userData.personalSkills ? this.authService.userData.personalSkills.slice() : [];
      this.fieldsOfExpertise = {
        label: 'Fields of expertise',
        dataEntered: this.fieldsOfExpertise_copy,
        dataOptions: this.expertiseFieldOptions
      };
      this.toolsAndLanguages = {
        label: 'Tools and Languages',
        dataEntered: this.toolsAndLanguages_copy,
        dataOptions: this.toolsAndLanguagesOptions
      };
      this.personalSkills = {
        label: 'Personal skills',
        dataEntered: this.personalSkills_copy,
        dataOptions: this.personalSkillsOptions
      };
    }
  }

  onSave() {
    let userId: string | undefined = '';
    this.storeUserData();
    // console.log(this.authService.userData);

    this.userService.userFirebaseUid.pipe((take(1)), switchMap(uid => {
      userId = uid;
      return this.userService.createUser({ ...this.authService.userData }, uid);
    }), untilDestroyed(this)).subscribe(_ => {
      this.authService.isLoggedIn = true;
      this.authService.userId = userId;
      this.authService.user.subscribe(userToken => {
        this.authService.userToken = userToken;
        localStorage.setItem('userData', JSON.stringify(userToken));
      });
      this.router.navigate(['profile', this.authService.userId]);
    });
  }

  onUpdate() {
    let obj = {
      ...this.formGroup.getRawValue(),
      'toolsAndLanguages': this.toolsAndLanguages_copy,
      'personalSkills': this.personalSkills_copy,
      'fieldsOfExpertise': this.fieldsOfExpertise_copy
    };
    this.userService.updateUserField('skills', obj, this.authService.userId!)
      .pipe(take(1)).subscribe(_ => {
        from(this.router.navigate([''], { skipLocationChange: true })).pipe(take(1)).subscribe(_ => {
          this.router.navigate(['/profile', this.authService.userId]);
        });
      });
  }

  onExit() {
    if (!this.toEdit)
      this.router.navigate(['']);
  }

  private storeUserData() {
    const data = this.formGroup.getRawValue();
    this.authService.userData.skillsVideo = data.skillsVideo;
  }
}
