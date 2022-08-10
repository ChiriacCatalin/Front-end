import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { from, take } from 'rxjs';
import { AuthService } from 'src/app/services';
import { JobService } from 'src/app/services/jobs/job.service';
import { Job } from 'src/app/services/jobs/types/job.type';

@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoading: boolean = false;
  jobs?: Job[];

  constructor(private authService: AuthService, private jobService: JobService, private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.jobService.getAllJobs().pipe(untilDestroyed(this)).subscribe(jobs => {
      this.jobs = jobs;
      this.jobs.forEach(job => {
        job.date = this.jobService.getDate(job.date);
      });
      this.isLoading = false;
    });
  }

  onCompanyClicked(index: number) {
    from(this.router.navigate([''], { skipLocationChange: true })).pipe(take(1)).subscribe(_ => {
      this.router.navigate(['/company', this.jobs![index].companyId]);
    });
  }

}
