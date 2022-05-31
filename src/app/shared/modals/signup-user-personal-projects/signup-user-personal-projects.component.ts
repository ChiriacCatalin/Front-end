import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-user-personal-projects',
  templateUrl: './signup-user-personal-projects.component.html',
  styleUrls: ['./signup-user-personal-projects.component.css']
})
export class SignupUserPersonalProjectsComponent {
  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      projectName: new FormControl(null, [Validators.required]),
      projectStartDate: new FormControl(null, Validators.required),
      projectEndDate: new FormControl(null, []),
      projectDescription: new FormControl(null, []),
      projectVideo: new FormControl(null, []),
    });
  }

  onSave() {
    const data = this.formGroup.getRawValue();
  }

}
