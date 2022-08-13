import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { switchMap, take } from 'rxjs';
import { AuthService } from 'src/app/services';
import { CompanyService } from 'src/app/services/company/company.service';

@UntilDestroy()
@Component({
  selector: 'app-signup-company-about',
  templateUrl: './signup-company-about.component.html',
  styleUrls: ['./signup-company-about.component.css']
})
export class SignupCompanyAboutComponent {

  formGroup: UntypedFormGroup;
  constructor(private readonly router: Router,
    private readonly authService: AuthService,
    private readonly companyService: CompanyService) {
    this.formGroup = new UntypedFormGroup({
      website: new UntypedFormControl(null, [Validators.maxLength(200)]),
      aboutUs: new UntypedFormControl(null, [Validators.required, Validators.maxLength(10000)]),
      contact: new UntypedFormControl(null, [Validators.required, Validators.maxLength(200), Validators.email]),
      companySize: new UntypedFormControl('1-10', [Validators.maxLength(8)]),
      founded: new UntypedFormControl(2022, [Validators.maxLength(10), Validators.min(1900), Validators.max(2100)]),
      companyAboutVideo: new UntypedFormControl(null, [Validators.maxLength(500)])
    });
  }

  onExit() {
    // if (!this.mainInfo)
    //   this.router.navigate(['']);
  }

  onSave() {
    this.storeCompanyData();

    let companyId: string | undefined = '';
    this.companyService.companyFirebaseUid.pipe(take(1), switchMap(uid => {
      companyId = uid;
      return this.companyService.createCompany({ ...this.authService.companyData }, uid);
    }), untilDestroyed(this)).subscribe(_ => {
      this.authService.isLoggedIn = true;
      this.authService.userId = companyId;
      this.authService.user.subscribe(userToken => {
        this.authService.userToken = userToken;
        localStorage.setItem('userData', JSON.stringify(userToken));
      });
      this.router.navigate(['company', this.authService.userId]);
    });
  }

  private storeCompanyData() {
    const data = this.formGroup.getRawValue();
    this.authService.companyData!.aboutUs = data.aboutUs;
    this.authService.companyData!.founded = data.founded;
    this.authService.companyData!.companySize = data.companySize;
    this.authService.companyData!.companyAboutVideo = data.companyAboutVideo;
    this.authService.companyData!.website = data.website;
    this.authService.companyData!.contact = data.contact;
  }
}
