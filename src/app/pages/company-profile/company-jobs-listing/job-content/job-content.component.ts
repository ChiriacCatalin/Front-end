import { Component, Input, OnInit } from '@angular/core';
import { Job } from 'src/app/services/jobs/types/job.type';

@Component({
  selector: 'app-job-content',
  templateUrl: './job-content.component.html',
  styleUrls: ['./job-content.component.css']
})
export class JobContentComponent {
  @Input() jobId?: number;
  @Input() job?: Job;
  constructor() { }
}
