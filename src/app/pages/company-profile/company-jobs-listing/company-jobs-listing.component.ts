import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { from, take } from 'rxjs';
import { AuthService } from 'src/app/services';
import { JobService } from 'src/app/services/jobs/job.service';
import { Job } from 'src/app/services/jobs/types/job.type';


@UntilDestroy()
@Component({
  selector: 'app-company-jobs-listing',
  templateUrl: './company-jobs-listing.component.html',
  styleUrls: ['./company-jobs-listing.component.css']
})
export class CompanyJobsListingComponent implements OnInit {
  companyId: string;
  jobs?: Job[];
  isLoading = false;
  isFinished: boolean = true;
  lastKey?: string;
  noJobs: boolean = false;

  constructor(private router: Router, private readonly route: ActivatedRoute,
    private jobService: JobService, readonly authService: AuthService) {
    this.companyId = this.route.snapshot.params['companyId'];
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.jobService.getJobsByCompanyId(this.companyId).pipe(take(1)).subscribe(jobs => {
      this.jobs = jobs;
      if (jobs.length > 0)
        this.lastKey = this.jobs[this.jobs.length - 1].date;
      this.jobs.forEach(job => {
        job.date = this.jobService.getDate(job.date);
      });
      this.isLoading = false;
    });
  }

  onViewApplicants(index: number) {
    this.router.navigate([]).
      then(result => { window.open(`/company/${this.companyId}/job/${this.jobs![index].id}/applicants`, '_blank'); });
  }

  onCompanyClicked(index: number) {
    // from(this.router.navigate([''], { skipLocationChange: true })).pipe(take(1)).subscribe(_ => {
    //   this.router.navigate(['/company', this.jobs![index].companyId]);
    // });
  }

  onScroll() {
    if (!this.noJobs) {
      this.isFinished = false;
      this.jobService.getJobsByCompanyId(this.companyId, this.lastKey).pipe(untilDestroyed(this)).subscribe(jobs => {
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
}
