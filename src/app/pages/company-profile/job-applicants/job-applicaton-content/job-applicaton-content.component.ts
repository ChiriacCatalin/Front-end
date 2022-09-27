import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Applicant } from 'src/app/services/jobs/types/appliants.types';

@Component({
  selector: 'app-job-applicaton-content',
  templateUrl: './job-applicaton-content.component.html',
  styleUrls: ['./job-applicaton-content.component.css']
})
export class JobApplicatonContentComponent {
  @Input() applicantId?: number;
  @Input() applicant?: Applicant;

  constructor(private sanitizer: DomSanitizer, private router: Router) { }

  onApplicantClicked() {
    this.router.navigate([]).then(result => { window.open(`/profile/${this.applicant!.userId}`, '_blank'); });
  }

  sanitize(url: string | undefined) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url!);
  }

}
