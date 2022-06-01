import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { switchMap, take } from 'rxjs';
import { AuthService } from 'src/app/services';
import { UserToken } from 'src/app/services/user-token';
import { UserService } from 'src/app/services/user/user.service';

@UntilDestroy()
@Component({
  selector: 'app-signup-user-personal-projects',
  templateUrl: './signup-user-personal-projects.component.html',
  styleUrls: ['./signup-user-personal-projects.component.css']
})
export class SignupUserPersonalProjectsComponent {
  @ViewChild('myModalTriggerSkils') myModalTrigger!: ElementRef;
  formGroup: FormGroup;

  constructor(private readonly userService: UserService, private readonly router: Router, private readonly authService: AuthService) {
    this.formGroup = new FormGroup({
      projectName: new FormControl(null, [Validators.required]),
      projectStartDate: new FormControl(null, Validators.required),
      projectEndDate: new FormControl(null, []),
      projectDescription: new FormControl(null, []),
      projectVideo: new FormControl(null, []),
    });
  }

  onSave() {
    this.storeUserProjects();
    console.log(this.authService.userData);
    const data = this.formGroup.getRawValue();
    let userId: string | undefined = '';
    this.myModalTrigger.nativeElement.click();
  }

  onExit() {
    this.router.navigate(['']);
  }

  onSkip(){
    this.myModalTrigger.nativeElement.click();
  }

  private storeUserProjects() {
    const data = this.formGroup.getRawValue();
    this.authService.userData.projects?.push({ ...data });
  }

}
