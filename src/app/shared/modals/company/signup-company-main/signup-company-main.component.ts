import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from, take } from 'rxjs';
import { AuthService } from 'src/app/services';
import { CompanyService } from 'src/app/services/company/company.service';
import { Company } from 'src/app/services/company/types/company.types';

@Component({
  selector: 'app-signup-company-main',
  templateUrl: './signup-company-main.component.html',
  styleUrls: ['./signup-company-main.component.css']
})
export class SignupCompanyMainComponent implements OnChanges {
  @ViewChild('myModalTriggerCompanyAbout') myModalTrigger!: ElementRef;
  @Input() company?: Company;

  formGroup: FormGroup;
  constructor(private readonly router: Router,
    private readonly authService: AuthService,
    private companyService: CompanyService) {
    this.formGroup = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(200)]),
      salesPitch: new FormControl(null, [Validators.required, Validators.maxLength(500)]),
      industry: new FormControl(null, [Validators.required, Validators.maxLength(300)]),
      headquarters: new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.min(2)]),
      companyVideo: new FormControl(null, [Validators.maxLength(500)])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.company) {
      let company_copy = { ...this.company };
      delete company_copy.imageUrl;
      // console.log(this.company_copy);
      this.formGroup.setValue({
        name: company_copy.name,
        salesPitch: company_copy.salesPitch,
        industry: company_copy.industry,
        headquarters: company_copy.headquarters,
        companyVideo: company_copy.companyVideo ? company_copy.companyVideo : null
      });
    }
  }

  onExit() {
    if (!this.company)
      this.router.navigate(['']);
  }

  onSave() {
    //
    this.storeCompanyData();
    this.myModalTrigger.nativeElement.click();
  }

  onUpdate() {
    // console.log(this.formGroup.getRawValue());
    this.companyService.updateCompanyField('mainInfo', this.formGroup.getRawValue(), this.authService.userId!)
      .pipe(take(1)).subscribe(_ => {
        from(this.router.navigate([''], { skipLocationChange: true })).pipe(take(1)).subscribe(_ => {
          this.router.navigate(['/company', this.authService.userId]);
        });
      });
  }

  private storeCompanyData() {
    const data = this.formGroup.getRawValue();
    this.authService.companyData = { ...data };
    this.authService.companyData!.imageUrl = null;
  }

}
