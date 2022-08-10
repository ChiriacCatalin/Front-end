import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from 'src/app/services';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/services/user/types/user.types';
import { CompanyService } from 'src/app/services/company/company.service';
import { Company } from 'src/app/services/company/types/company.types';
import { Router } from '@angular/router';
import { from, take } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-profile-mini-data',
  templateUrl: './profile-mini-data.component.html',
  styleUrls: ['./profile-mini-data.component.css']
})
export class ProfileMiniDataComponent implements OnInit {
  user: User | undefined;
  company: Company | undefined;
  isLoading: boolean = false;

  constructor(readonly authService: AuthService, private userService: UserService,
    private companyService: CompanyService, private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true;
    if (this.authService.userToken?.type === 'user') {
      this.userService.getUser(this.authService.userId!).pipe(untilDestroyed(this)).subscribe(user => {
        this.user = user;
        this.isLoading = false;
      });
    }
    else if ((this.authService.userToken?.type === 'company')) {
      this.companyService.getCompany(this.authService.userId!).pipe(untilDestroyed(this)).subscribe(company => {
        this.company = company;
        this.isLoading = false;
      });
    }
  }

  onUserClicked() {
    if (this.authService.userToken?.type === 'company') {
      from(this.router.navigate([''], { skipLocationChange: true })).pipe(take(1)).subscribe(_ => {
        this.router.navigate(['/company', this.authService.userId]);
      });
    }
    else if (this.authService.userToken?.type === 'user'){
      from(this.router.navigate([''], { skipLocationChange: true })).pipe(take(1)).subscribe(_ => {
        this.router.navigate(['/profile', this.authService.userId]);
      });
    }
  }

}
