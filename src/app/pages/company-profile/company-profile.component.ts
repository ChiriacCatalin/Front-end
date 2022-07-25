import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from 'src/app/services';
import { CompanyService } from 'src/app/services/company/company.service';
import { Company } from 'src/app/services/company/types/company.types';

@UntilDestroy()
@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {
  companyId: string;
  company: Company | undefined;
  isLoading: boolean = true;

  constructor(private readonly companyService: CompanyService,
    private readonly activatedRoute: ActivatedRoute,
    readonly authService: AuthService) {
    this.companyId = this.activatedRoute.snapshot.params['companyId'];
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.companyService.getCompany(this.companyId).pipe(untilDestroyed(this)).subscribe(company => {
      this.company = company;
      // console.log(this.company);
      this.isLoading = false;
    });
  }

}
