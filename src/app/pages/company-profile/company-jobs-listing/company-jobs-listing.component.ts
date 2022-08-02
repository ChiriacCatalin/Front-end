import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-jobs-listing',
  templateUrl: './company-jobs-listing.component.html',
  styleUrls: ['./company-jobs-listing.component.css']
})
export class CompanyJobsListingComponent {

  constructor(private router: Router) { }

  onCompanyClicked(){
    this.router.navigate(['jobs']);
  }

}
