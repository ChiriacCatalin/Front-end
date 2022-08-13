import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take, from } from 'rxjs';
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

  formGroup: UntypedFormGroup;
  constructor(private readonly router: Router,
    private readonly authService: AuthService,
    private readonly companyService: CompanyService) {
    this.formGroup = new UntypedFormGroup({
      website: new UntypedFormControl(null, [Validators.maxLength(200)]),
      aboutUs: new UntypedFormControl(null, [Validators.required, Validators.maxLength(10000)]),
      contact: new UntypedFormControl(null, [Validators.required, Validators.maxLength(200), Validators.email]),
      companySize: new UntypedFormControl('1-10', [Validators.required, Validators.maxLength(8)]),
      industry: new UntypedFormControl(null, [Validators.required, Validators.maxLength(200)]),
      headquarters: new UntypedFormControl(null, [Validators.required, Validators.maxLength(100), Validators.minLength(2)]),
      founded: new UntypedFormControl(2022, [Validators.required, Validators.maxLength(10), Validators.min(1900), Validators.max(2100)]),
      companyAboutVideo: new UntypedFormControl(null, [Validators.maxLength(500)])
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
    console.log(this.formGroup.getRawValue());
    this.companyService.updateCompanyField('about', this.formGroup.getRawValue(), this.authService.userId!)
      .pipe(take(1)).subscribe(_ => {
        from(this.router.navigate([''], { skipLocationChange: true })).pipe(take(1)).subscribe(_ => {
          this.router.navigate(['/company', this.authService.userId]);
        });
      });
  }
}
