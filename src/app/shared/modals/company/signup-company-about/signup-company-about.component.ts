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

  onExit() {
    // if (!this.mainInfo)
    //   this.router.navigate(['']);
  }
}
