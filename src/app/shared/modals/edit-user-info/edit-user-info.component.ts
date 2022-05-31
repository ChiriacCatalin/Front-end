import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { switchMap, take } from 'rxjs';
import { AuthService } from 'src/app/services';
import { UserToken } from 'src/app/services/user-token';
import { UserService } from 'src/app/services/user/user.service';

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
      name: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      country: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      birthdate: new FormControl(null, []),
      email: new FormControl(null, [Validators.required, Validators.email]),
      studiedAt: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      worksAt: new FormControl(null, [])
    });
  }

  // ngAfterViewInit(): void {
  //   this.myModalTrigger.nativeElement.click();
  // }

  onSave() {
    const data = this.formGroup.getRawValue();
    let userId: string | undefined = '';
    this.storeUserData(data.birthdate, data.city, data.country, data.name, data.email, data.studiedAt, data.worksAt);

    // this.userService.userFirebaseUid.pipe((take(1)), switchMap(uid => {
    //   userId = uid;
    //   // console.log(data);
    //   this.storeUserData(data.birthdate, data.city, data.country, data.name, data.email, data.studiedAt, data.worksAt);
    //   return this.userService.createUser({ ...data }, uid);
    // }), untilDestroyed(this)).subscribe(_ => {
    //   this.router.navigate(['profile']);
    //   this.authService.isLoggedIn = true;
    //   this.authService.userId = userId;
    //   this.authService.user.subscribe(userToken => {
    //     this.authService.userToken = userToken;
    //     localStorage.setItem('userData', JSON.stringify(userToken));
    //   });
    // });
    this.myModalTrigger.nativeElement.click();
  }

  storeUserData(birthdate: string | undefined, city: string, country: string, name: string,
    email: string, studiedAt: string, worksAt: string | undefined) {
    this.authService.userData.birthdate = birthdate;
    this.authService.userData.city = city;
    this.authService.userData.country = country;
    this.authService.userData.name = name;
    this.authService.userData.email = email;
    this.authService.userData.studiedAt = studiedAt;
    this.authService.userData.worksAt = worksAt;
    console.log(this.authService.userData);
  }
}
