import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-signup-company-about',
  templateUrl: './signup-company-about.component.html',
  styleUrls: ['./signup-company-about.component.css']
})
export class SignupCompanyAboutComponent {

  formGroup: FormGroup;
  constructor(private readonly router: Router, private readonly authService: AuthService) {
    this.formGroup = new FormGroup({
      website: new FormControl(null, [Validators.maxLength(200)]),
      aboutUs: new FormControl(null, [Validators.required, Validators.maxLength(500)]),
      contact: new FormControl(null, [Validators.required, Validators.maxLength(200), Validators.email]),
      companySize: new FormControl('1-10', [Validators.maxLength(8)]),
      founded: new FormControl(2022, [Validators.maxLength(10), Validators.min(1900), Validators.max(2100)]),
      companyAboutVideo: new FormControl(null, [Validators.maxLength(500)])
    });
  }

  onExit() {
    // if (!this.mainInfo)
    //   this.router.navigate(['']);
  }

  onSave() {
    this.storeCompanyData();
  }

  private storeCompanyData() {
    const data = this.formGroup.getRawValue();
    this.authService.companyData!.aboutUs = data.aboutUs;
    this.authService.companyData!.founded = data.founded;
    this.authService.companyData!.companySize = data.companySize;
    this.authService.companyData!.companyAboutVideo = data.companyAboutVideo;
    this.authService.companyData!.website = data.website;
    this.authService.companyData!.contact = data.contact;
    console.log(this.authService.companyData);
  }
}
