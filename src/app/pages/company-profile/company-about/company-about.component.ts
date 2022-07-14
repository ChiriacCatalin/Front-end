import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/services/company/types/company.types';

@Component({
  selector: 'app-company-about',
  templateUrl: './company-about.component.html',
  styleUrls: ['./company-about.component.css']
})
export class CompanyAboutComponent implements OnChanges {
  @Input() company?: Company;

  companyId: string;
  isLoading: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer) {
    this.companyId = this.activatedRoute.snapshot.params['companyId'];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.company) {
      this.isLoading = false;
    }
  }

  sanitize(url: string | undefined) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url!);
  }
}
