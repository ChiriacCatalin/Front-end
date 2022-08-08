import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from, take } from 'rxjs';
import { AuthService } from 'src/app/services';
import { JobService } from 'src/app/services/jobs/job.service';
import { Job } from 'src/app/services/jobs/types/job.type';


@Component({
  selector: 'app-company-jobs-listing',
  templateUrl: './company-jobs-listing.component.html',
  styleUrls: ['./company-jobs-listing.component.css']
})
export class CompanyJobsListingComponent implements OnInit {
  companyId: string;
  jobs?: Job[];
  isLoading = false;

  constructor(private router: Router, private readonly route: ActivatedRoute,
    private jobService: JobService, readonly authService: AuthService) {
    this.companyId = this.route.snapshot.params['companyId'];
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.jobService.getJobsByCompanyId(this.companyId).pipe(take(1)).subscribe(data => {
      this.jobs = data;
      this.jobs.forEach(job => {
        job.date = this.getDate(job.date);
        this.isLoading = false;
      });
    });
  }

  onCompanyClicked(index: number) {
    from(this.router.navigate([''], { skipLocationChange: true })).pipe(take(1)).subscribe(_ => {
      this.router.navigate(['/company', this.jobs![index].companyId]);
    });
  }

  getDate(postingTime: string) {
    let value = Math.floor((new Date().getTime() - +postingTime) / 60000);
    const timeName = ['minutes ago', 'hours ago', 'days ago', 'weeks ago', 'months ago', 'years ago'];
    const timeNameSingular = ['minute ago', 'hour ago', 'day ago', 'week ago', 'month ago', 'year ago'];
    const timeDivValues = [60, 24, 7, 4, 12];
    let i;
    for (i = 0; i < 4; ++i) {
      if (value > timeDivValues[i])
        value /= timeDivValues[i];
      else break;
    }
    value = Math.floor(value);
    if (i === 4 && value < 12)
      i = 3;
    return `${Math.floor(value)} ${value === 1 ? timeNameSingular[i] : timeName[i]}`;
  }
}
