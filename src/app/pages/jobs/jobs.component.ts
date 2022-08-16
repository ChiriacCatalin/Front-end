import { Component, DoCheck, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { from, take } from 'rxjs';
import { AuthService } from 'src/app/services';
import { JobService } from 'src/app/services/jobs/job.service';
import { filterOptions } from 'src/app/services/jobs/types/filter-options.type';
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
  isFinished: boolean = true;
  lastKey?: string;
  noJobs: boolean = false;

  filters?: filterOptions;

  constructor(private authService: AuthService, private jobService: JobService,
    private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getJobs();
  }

  ngDoCheck(): void {
    if (window.screen.width < 576)
      this.mobile = true;
    else
      this.mobile = false;
  }

  applyFilter($event: filterOptions) {
    this.filters = $event;
    this.jobs = [];
    this.selectedJob = undefined;
    this.getJobs(this.filters);
  }

  selectJobOffer(index: number) {
    this.selectedJob = this.jobs![index];
  }

  onCompanyClicked(index: number) {
    from(this.router.navigate([''], { skipLocationChange: true })).pipe(take(1)).subscribe(_ => {
      this.router.navigate(['/company', this.jobs![index].companyId]);
    });
  }

  onScroll() {
    if (!this.noJobs) {
      this.isFinished = false;
      this.jobService.getAllJobs(this.lastKey, this.filters).pipe(untilDestroyed(this)).subscribe(jobs => {
        if (jobs.length > 0) {
          // if (this.lastKey === jobs[jobs.length - 1].date) {
          //   this.noJobs = true;
          // }
          this.lastKey = jobs[jobs.length - 1].date;
        }
        if (jobs.length === 0)
          this.noJobs = true;
        if (!this.noJobs) {
          jobs.forEach(job => {
            job.date = this.jobService.getDate(job.date);
            if (jobs.length === 0)
              this.isFinished = true;
          });
          this.jobs = this.jobs?.concat(jobs);
        }
        this.isFinished = true;
      });
    }
  }

  getJobs(filters?: filterOptions) {
    this.isLoading = true;
    this.jobService.getAllJobs(undefined, this.filters).pipe(untilDestroyed(this)).subscribe(jobs => {
      this.jobs = jobs;
      if (jobs.length > 0)
        this.lastKey = this.jobs[this.jobs.length - 1].date;
      this.jobs.forEach(job => {
        job.date = this.jobService.getDate(job.date);
      });
      if (this.jobs.length > 0)
        this.selectedJob = this.jobs[0];
      this.isLoading = false;
    });
  }

  sanitize(url: string | undefined) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url!);
  }
}
