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

  onSave(){
    //
  }
}
