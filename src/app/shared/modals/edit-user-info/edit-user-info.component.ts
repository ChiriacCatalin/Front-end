import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { switchMap, take } from 'rxjs';
import { AuthService } from 'src/app/services';
import { UserToken } from 'src/app/services/user-token';
import { UserService } from 'src/app/services/user/user.service';
import { Chips } from '../../input-chips/chips';

@UntilDestroy()
@Component({
  selector: 'app-edit-user-info',
  templateUrl: './edit-user-info.component.html',
  styleUrls: ['./edit-user-info.component.css']
})
export class EditUserInfoComponent {
  // @ViewChild('myModalTriggerInfo') myModalTrigger!: ElementRef;
  @ViewChild('myModalTriggerWork') myModalTrigger!: ElementRef;

  formGroup: FormGroup;

  constructor(private readonly userService: UserService, private readonly router: Router, private readonly authService: AuthService) {
    this.formGroup = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(100)]),
      country: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      city: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      birthdate: new FormControl(null, []),
      email: new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(200)]),
      studiedAt: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(200)]),
      worksAt: new FormControl(null, [Validators.maxLength(200)]),
      mainVideo: new FormControl(null, [Validators.maxLength(500)])
    });
  }

  // ngAfterViewInit(): void {
  //   this.myModalTrigger.nativeElement.click();
  // }

  onSave() {
    // const data = this.formGroup.getRawValue();
    let userId: string | undefined = '';
    this.storeUserData();
    this.myModalTrigger.nativeElement.click();
  }

  onExit() {
    this.router.navigate(['']);
  }

  private storeUserData() {
    const data = this.formGroup.getRawValue();
    this.authService.userData.mainInfo = { ...data };
    this.authService.userData.mainInfo!.imageUrl = null;
    console.log(this.authService.userData);
  }

}
