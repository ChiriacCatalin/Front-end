import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-apply-for-job',
  templateUrl: './apply-for-job.component.html',
  styleUrls: ['./apply-for-job.component.css']
})
export class ApplyForJobComponent {
  @Input() uniqueId?: string;
  @Input() questions?: string[];

  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      jobMotivation: new FormControl(null, [Validators.maxLength(500)]),
      interviewVideo: new FormControl(null, [Validators.maxLength(500)])
    });
  }

  onApply() {
   
  }
}
