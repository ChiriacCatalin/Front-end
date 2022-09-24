import { Component, DoCheck, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from 'src/app/services';
import { JobService } from 'src/app/services/jobs/job.service';
import { Applicant } from 'src/app/services/jobs/types/appliants.types';

@UntilDestroy()
@Component({
  selector: 'app-job-applicants',
  templateUrl: './job-applicants.component.html',
  styleUrls: ['./job-applicants.component.css']
})
export class JobApplicantsComponent implements OnInit, DoCheck {

  companyId: string;
  jobId: string;
  isLoading: boolean = false;
  applicants?: Applicant[];
  selectedApplicant?: Applicant;
  lastKey?: string;
  mobile: boolean = false;
  isFinished: boolean = true;
  noApplicants: boolean = false;

  constructor(readonly authService: AuthService, private jobService: JobService,
    private router: Router, private readonly route: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.companyId = this.route.snapshot.params['companyId'];
    this.jobId = this.route.snapshot.params['jobId'];
  }

  ngOnInit(): void {
    this.getApplicants();
  }

  ngDoCheck(): void {
    if (window.screen.width < 576)
      this.mobile = true;
    else
      this.mobile = false;
  }

  onScroll() {
    if (!this.noApplicants) {
      this.isFinished = false;
      this.jobService.getJobApplicants(this.companyId, this.jobId, this.lastKey).pipe(untilDestroyed(this)).subscribe(applicants => {
        if (applicants.length > 0) {
          // if (this.lastKey === jobs[jobs.length - 1].date) {
          //   this.noJobs = true;
          // }
          this.lastKey = applicants[applicants.length - 1].date;
        }
        if (applicants.length === 0)
          this.noApplicants = true;
        if (!this.noApplicants) {
          applicants.forEach(applicant => {
            applicant.date = this.jobService.getDate(applicant.date);
            if (applicants.length === 0)
              this.isFinished = true;
          });
          this.applicants = this.applicants?.concat(applicants);
        }
        this.isFinished = true;
      });
    }
  }

  selectApplicant(index: number) {
    this.selectedApplicant = this.applicants![index];

  }
  onApplicantClicked(index: number) {
     this.router.navigate([]).then(result => {  window.open(`/profile/${this.applicants![index].userId}`, '_blank'); });
  }

  getApplicants() {
    this.isLoading = true;
    this.jobService.getJobApplicants(this.companyId, this.jobId, undefined).pipe(untilDestroyed(this)).subscribe(applicants => {
      this.applicants = applicants;
      if (applicants.length > 0)
        this.lastKey = this.applicants[this.applicants.length - 1].date;
      this.applicants.forEach(applicant => {
        applicant.date = this.jobService.getDate(applicant.date);
      });
      if (this.applicants.length > 0)
        this.selectedApplicant = this.applicants[0];
      this.isLoading = false;
    });
  }

  sanitize(url: string | undefined) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url!);
  }
}
