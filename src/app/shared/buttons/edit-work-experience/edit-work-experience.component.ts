import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-work-experience',
  templateUrl: './edit-work-experience.component.html',
  styleUrls: ['./edit-work-experience.component.css']
})
export class EditWorkExperienceComponent {
  formGroup: UntypedFormGroup;

  constructor() {
    this.formGroup = new UntypedFormGroup({
      workPosition: new UntypedFormControl(null, [Validators.required]),
      workStartDate: new UntypedFormControl(null, Validators.required),
      workEndDate: new UntypedFormControl(null, []),
      workDescription: new UntypedFormControl(null, []),
      workVideo: new UntypedFormControl(null, []),
    });
  }

  onSave() {
    console.log(this.formGroup.getRawValue());
  }

}
