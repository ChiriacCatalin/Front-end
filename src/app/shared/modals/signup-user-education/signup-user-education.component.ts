import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-signup-user-education',
  templateUrl: './signup-user-education.component.html',
  styleUrls: ['./signup-user-education.component.css']
})
export class SignupUserEducationComponent {
  @ViewChild('myModalTriggerProject') myModalTrigger!: ElementRef;
  formGroup: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.formGroup = new FormGroup({
      school: new FormControl(null, [Validators.required]),
      schoolDegree: new FormControl(null, Validators.required),
      schoolStartDate: new FormControl(null, Validators.required),
      schoolEndDate: new FormControl(null, []),
      schoolDescription: new FormControl(null, []),
      schoolVideo: new FormControl(null, []),
    });
  }

  onSave(){
    this.storeUserEducation();
    console.log(this.authService.userData);
    this.myModalTrigger.nativeElement.click();
  }

  onExit() {
    this.router.navigate(['']);
  }
  
  private storeUserEducation(){
    const data = this.formGroup.getRawValue();
    this.authService.userData.schools?.push({ ...data });
  }
}
