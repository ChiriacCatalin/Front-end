import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { from, take } from 'rxjs';
import { AuthService } from 'src/app/services';
import { ModalsDataService } from 'src/app/services/data/modals-data.service';
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
  city?: string[];
  country?: string[];

  constructor(private readonly userService: UserService, private readonly router: Router,
    private readonly authService: AuthService, private modalsData: ModalsDataService) {
    this.formGroup = new UntypedFormGroup({
      name: new UntypedFormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(100)]),
      country: new UntypedFormControl(null, [Validators.required, Validators.maxLength(150), this.existingCountry.bind(this)]),
      city: new UntypedFormControl(null, [Validators.required, Validators.maxLength(150)]),
      birthdate: new UntypedFormControl(null, []),
      email: new UntypedFormControl(null, [Validators.required, Validators.email, Validators.maxLength(200)]),
      studiedAt: new UntypedFormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(200)]),
      worksAt: new UntypedFormControl(null, [Validators.maxLength(200)]),
      mainVideo: new UntypedFormControl(null, [Validators.maxLength(500)])
    });
    this.city = modalsData.city;
    this.country = modalsData.country;
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

  existingCountry(control: FormControl): { [s: string]: boolean } | null {
    if (!(this.country?.indexOf(control.value) !== -1)) {
      return { 'notValid': true };
    }
    return null;
  }

  private storeUserData() {
    const data = this.formGroup.getRawValue();
    this.authService.userData.mainInfo = { ...data };
    this.authService.userData.mainInfo!.imageUrl = null;
    // console.log(this.authService.userData);
  }


}
