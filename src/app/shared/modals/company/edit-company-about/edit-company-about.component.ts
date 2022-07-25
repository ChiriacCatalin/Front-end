import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services';
import { CompanyService } from 'src/app/services/company/company.service';
import { Company } from 'src/app/services/company/types/company.types';

@Component({
  selector: 'app-edit-company-about',
  templateUrl: './edit-company-about.component.html',
  styleUrls: ['./edit-company-about.component.css']
})
export class EditCompanyAboutComponent implements OnChanges {
  @Input() company?: Company;

  formGroup: FormGroup;
  constructor(private readonly router: Router,
    private readonly authService: AuthService,
    private readonly companyService: CompanyService) {
    this.formGroup = new FormGroup({
      website: new FormControl(null, [Validators.maxLength(200)]),
      aboutUs: new FormControl(null, [Validators.required, Validators.maxLength(500)]),
      contact: new FormControl(null, [Validators.required, Validators.maxLength(200), Validators.email]),
      companySize: new FormControl('1-10', [Validators.required, Validators.maxLength(8)]),
      industry: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      headquarters: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      founded: new FormControl(2022, [Validators.required, Validators.maxLength(10), Validators.min(1900), Validators.max(2100)]),
      companyAboutVideo: new FormControl(null, [Validators.maxLength(500)])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.company) {
      let company_copy = { ...this.company };
      delete company_copy.imageUrl;
      this.formGroup.setValue({
        website: company_copy.website ? company_copy.website : null,
        aboutUs: company_copy.aboutUs,
        contact: company_copy.contact,
        companySize: company_copy.companySize,
        industry: company_copy.industry,
        headquarters: company_copy.headquarters,
        founded: company_copy.founded,
        companyAboutVideo: company_copy.companyAboutVideo ? company_copy.companyAboutVideo : null
      });
    }
  }

  onExit() {
    if (!this.company)
      this.router.navigate(['']);
  }

  onUpdate() {
    //
  }
}
