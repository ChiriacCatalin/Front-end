import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { AuthService } from 'src/app/services';
import { JobService } from 'src/app/services/jobs/job.service';
import { Job } from 'src/app/services/jobs/types/job.type';

@Component({
  selector: 'app-apply-for-job',
  templateUrl: './apply-for-job.component.html',
  styleUrls: ['./apply-for-job.component.css']
})
export class ApplyForJobComponent {
  @Input() uniqueId?: string;
  @Input() job?: Job;

  formGroup: FormGroup;

  constructor(private jobsService: JobService, private readonly authService: AuthService) {
    this.formGroup = new FormGroup({
      jobMotivation: new FormControl(null, [Validators.maxLength(500)]),
      interviewVideo: new FormControl(null, [Validators.maxLength(500)])
    });
  }

  onApply() {
    this.jobsService.addApplicant(this.formGroup.getRawValue(),
      this.job!.companyId, this.job!.id, this.authService.userToken?.id).pipe(take(1)).subscribe(response => {
      });
  }
}
