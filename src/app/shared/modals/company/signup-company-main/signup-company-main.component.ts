import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-signup-company-main',
  templateUrl: './signup-company-main.component.html',
  styleUrls: ['./signup-company-main.component.css']
})
export class SignupCompanyMainComponent {
  @ViewChild('myModalTriggerCompanyAbout') myModalTrigger!: ElementRef;

  formGroup: FormGroup;
  constructor(private readonly router: Router, private readonly authService: AuthService) {
    this.formGroup = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(200)]),
      salesPitch: new FormControl(null, [Validators.required, Validators.maxLength(500)]),
      industry: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      headquarters: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      companyVideo: new FormControl(null, [Validators.maxLength(500)])
    });
  }

  onExit() {
    // if (!this.mainInfo)
    //   this.router.navigate(['']);
  }

  onSave() {
    //
    this.storeCompanyData();
    this.myModalTrigger.nativeElement.click();
  }

  private storeCompanyData() {
    const data = this.formGroup.getRawValue();
    this.authService.companyData = { ...data };
    this.authService.companyData!.imageUrl = null;
    console.log(this.authService.companyData);
  }

}
