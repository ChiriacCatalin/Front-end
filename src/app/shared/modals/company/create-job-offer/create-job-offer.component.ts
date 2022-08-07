import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take, from } from 'rxjs';
import { AuthService } from 'src/app/services';
import { CompanyService } from 'src/app/services/company/company.service';
import { Company } from 'src/app/services/company/types/company.types';
import { ModalsDataService } from 'src/app/services/data/modals-data.service';
import { JobService } from 'src/app/services/jobs/job.service';
import { Job } from 'src/app/services/user/types/jobs.types';

@Component({
  selector: 'app-create-job-offer',
  templateUrl: './create-job-offer.component.html',
  styleUrls: ['./create-job-offer.component.css']
})
export class CreateJobOfferComponent {
  @Input() company?: Company;

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

  onSave() {
    const formValues = {
      ... this.formGroup.getRawValue(),
      companyName: this.authService.companyData?.name,
      imgUrl: this.authService.companyData?.imageUrl,
      companyId: this.authService.userId,
      companySize: this.authService.companyData?.companySize
    };
    this.jobService.createJob(formValues, this.authService.userId!).pipe(take(1)).subscribe(_ => {
      from(this.router.navigate([''], { skipLocationChange: true })).pipe(take(1)).subscribe(_ => {
        this.router.navigate(['/company', this.authService.userId]);
      });
    });

  }

  onUpdate() {

  }

  onExit() {

  }

}
