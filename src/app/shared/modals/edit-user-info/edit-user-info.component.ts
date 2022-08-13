import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { from, take } from 'rxjs';
import { AuthService } from 'src/app/services';
import { MainInfo } from 'src/app/services/user/types/mainInfo.types';
import { User } from 'src/app/services/user/types/user.types';
import { UserService } from 'src/app/services/user/user.service';


@UntilDestroy()
@Component({
  selector: 'app-edit-user-info',
  templateUrl: './edit-user-info.component.html',
  styleUrls: ['./edit-user-info.component.css']
})
export class EditUserInfoComponent implements OnChanges {
  // @ViewChild('myModalTriggerInfo') myModalTrigger!: ElementRef;
  @ViewChild('myModalTriggerWork') myModalTrigger!: ElementRef;
  @Input() mainInfo?: MainInfo;
  formGroup: UntypedFormGroup;

  constructor(private readonly userService: UserService, private readonly router: Router, private readonly authService: AuthService) {
    this.formGroup = new UntypedFormGroup({
      name: new UntypedFormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(100)]),
      country: new UntypedFormControl(null, [Validators.required, Validators.maxLength(50)]),
      city: new UntypedFormControl(null, [Validators.required, Validators.maxLength(50)]),
      birthdate: new UntypedFormControl(null, []),
      email: new UntypedFormControl(null, [Validators.required, Validators.email, Validators.maxLength(200)]),
      studiedAt: new UntypedFormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(200)]),
      worksAt: new UntypedFormControl(null, [Validators.maxLength(200)]),
      mainVideo: new UntypedFormControl(null, [Validators.maxLength(500)])
    });
  }

  // ngAfterViewInit(): void {
  //   this.myModalTrigger.nativeElement.click();
  // }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.mainInfo) {
      let mainInfo_copy = { ...this.mainInfo };
      delete mainInfo_copy.imageUrl;
      this.formGroup.setValue(mainInfo_copy);
    }
  }

  onSave() {
    // const data = this.formGroup.getRawValue();
    let userId: string | undefined = '';
    this.storeUserData();
    this.myModalTrigger.nativeElement.click();
  }

  onExit() {
    if (!this.mainInfo)
      this.router.navigate(['']);
  }

  onUpdate() {
    // console.log(this.formGroup.getRawValue());
    this.userService.updateUserField('mainInfo', this.formGroup.getRawValue(), this.authService.userId!)
      .pipe(take(1)).subscribe(_ => {
        from(this.router.navigate([''], { skipLocationChange: true })).pipe(take(1)).subscribe(_ => {
          this.router.navigate(['/profile', this.authService.userId]);
        });
      });
  }

  private storeUserData() {
    const data = this.formGroup.getRawValue();
    this.authService.userData.mainInfo = { ...data };
    this.authService.userData.mainInfo!.imageUrl = null;
    // console.log(this.authService.userData);
  }

}
