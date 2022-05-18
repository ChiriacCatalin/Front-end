import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-work-experience',
  templateUrl: './edit-work-experience.component.html',
  styleUrls: ['./edit-work-experience.component.css']
})
export class EditWorkExperienceComponent implements OnInit {
  formGroup: FormGroup;

  constructor() {
  }


  ngOnInit(): void {
    this.formGroup = new FormGroup({
      workPosition: new FormControl(null, [Validators.required]),
      workStartDate: new FormControl(null, Validators.required),
      workEndDate: new FormControl(null, [Validators.required]),
      workDescripton: new FormControl(null, []),
      workVideo: new FormControl(null, []),
    });
  }

  onSubmit() {
    console.log(this.formGroup);
  }

}
