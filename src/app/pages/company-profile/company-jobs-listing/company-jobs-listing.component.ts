import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
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

  constructor(private router: Router, private readonly route: ActivatedRoute, private jobService: JobService) {
    this.companyId = this.route.snapshot.params['companyId'];
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.jobService.getJobsByCompanyId(this.companyId).pipe(take(1)).subscribe(data => {
      this.jobs = data;
      this.jobs.forEach(job => {
        job.date = new Date(+job.date);
        this.isLoading = false;
      });
    });
  }

  onCompanyClicked() {
    this.router.navigate(['jobs']);
  }
}
