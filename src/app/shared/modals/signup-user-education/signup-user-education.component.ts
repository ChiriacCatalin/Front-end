import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-user-education',
  templateUrl: './signup-user-education.component.html',
  styleUrls: ['./signup-user-education.component.css']
})
export class SignupUserEducationComponent {
  @ViewChild('myModalTriggerProject') myModalTrigger!: ElementRef;
  formGroup: FormGroup;

  constructor() {
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
    const data = this.formGroup.getRawValue();
    this.myModalTrigger.nativeElement.click();
  }
}
