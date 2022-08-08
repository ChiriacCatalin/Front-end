import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take, from } from 'rxjs';
import { AuthService } from 'src/app/services';
import { CompanyService } from 'src/app/services/company/company.service';
import { Company } from 'src/app/services/company/types/company.types';
import { ModalsDataService } from 'src/app/services/data/modals-data.service';
import { JobService } from 'src/app/services/jobs/job.service';
import { Job } from 'src/app/services/jobs/types/job.type';

@Component({
  selector: 'app-create-job-offer',
  templateUrl: './create-job-offer.component.html',
  styleUrls: ['./create-job-offer.component.css']
})
export class CreateJobOfferComponent implements OnChanges {
  @Input() job?: Job;
  @Input() uniqueId?: string;

  jobTypes?: string[];
  experienceLevels?: string[];
  siteRemote?: string[];
  city?: string[];
  country?: string[];

  formGroup: FormGroup;
  constructor(private readonly router: Router,
    private readonly authService: AuthService,
    private companyService: CompanyService,
    private modalsData: ModalsDataService,
    private jobService: JobService) {
    this.formGroup = new FormGroup({
      jobTitle: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(200)]),
      jobType: new FormControl('Full-time', [Validators.required, Validators.maxLength(500), Validators.min(2)]),
      experienceLevel: new FormControl('Entry level', [Validators.required, Validators.maxLength(200), Validators.min(2)]),
      onSiteRemote: new FormControl('On-Site', [Validators.required, Validators.maxLength(100), Validators.min(2)]),
      city: new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.min(2)]),
      country: new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.min(2)]),
      jobDescription: new FormControl(null, [Validators.required, Validators.maxLength(20000), Validators.min(2)]),
      jobVideo: new FormControl(null, [Validators.maxLength(500)])
    });
    this.jobTypes = modalsData.jobTypes;
    this.experienceLevels = modalsData.experienceLevels;
    this.siteRemote = modalsData.siteRemote;
    this.city = modalsData.city;
    this.country = modalsData.country;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.job) {
      let job_copy = { ...this.job };
      this.formGroup.setValue({
        jobTitle: job_copy.jobTitle,
        jobType: job_copy.jobType,
        experienceLevel: job_copy.experienceLevel,
        onSiteRemote: job_copy.onSiteRemote,
        city: job_copy.city,
        country: job_copy.country,
        jobDescription: job_copy.jobDescription ? job_copy.jobDescription : null,
        jobVideo: job_copy.jobVideo ? job_copy.jobVideo : null
      });
    }
  }

  onSave() {
    const jobData = this.getJobData();
    this.jobService.createJob(jobData, this.authService.userId!).pipe(take(1)).subscribe(_ => {
      from(this.router.navigate([''], { skipLocationChange: true })).pipe(take(1)).subscribe(_ => {
        this.router.navigate(['/company', this.authService.userId]);
      });
    });

  }

  onUpdate() {
    const jobData = this.getJobData();
    this.jobService.updateJob(this.job!.companyId, this.job!.id, jobData)
      .pipe(take(1)).subscribe(_ => {
        from(this.router.navigate([''], { skipLocationChange: true })).pipe(take(1)).subscribe(_ => {
          this.router.navigate(['/company', this.authService.userId]);
        });
      });

  }

  onDelete() {
    this.jobService.deleteJob(this.job!.companyId, this.job!.id).pipe(take(1)).subscribe(_ => {
      from(this.router.navigate([''], { skipLocationChange: true })).pipe(take(1)).subscribe(_ => {
        this.router.navigate(['/company', this.authService.userId]);
      });
    });
  }


  getJobData() {
    const formValues = {
      ... this.formGroup.getRawValue(),
      companyName: this.authService.companyData?.name,
      imgUrl: this.authService.companyData?.imageUrl,
      companyId: this.authService.userId,
      companySize: this.authService.companyData?.companySize
    };
    return formValues;
  }

}