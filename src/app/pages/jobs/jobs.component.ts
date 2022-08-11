import { Component, DoCheck, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { from, take } from 'rxjs';
import { AuthService } from 'src/app/services';
import { JobService } from 'src/app/services/jobs/job.service';
import { Job } from 'src/app/services/jobs/types/job.type';

@UntilDestroy()
@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit, DoCheck {
  jobs?: Job[];
  selectedJob?: Job;
  isLoading: boolean = false;
  mobile: boolean = false;

  constructor(private authService: AuthService, private jobService: JobService,
    private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.jobService.getAllJobs().pipe(untilDestroyed(this)).subscribe(jobs => {
      this.jobs = jobs;
      this.jobs.forEach(job => {
        job.date = this.jobService.getDate(job.date);
      });
      if (this.jobs.length > 0)
        this.selectedJob = this.jobs[0];
      this.isLoading = false;
    });
  }

  ngDoCheck(): void {
    if (window.screen.width < 576)
      this.mobile = true;
    else
      this.mobile = false;
    console.log(this.mobile);
  }

  selectJobOffer(index: number) {
    this.selectedJob = this.jobs![index];
  }

  onCompanyClicked(index: number) {
    from(this.router.navigate([''], { skipLocationChange: true })).pipe(take(1)).subscribe(_ => {
      this.router.navigate(['/company', this.jobs![index].companyId]);
    });
  }

  sanitize(url: string | undefined) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url!);
  }
}
