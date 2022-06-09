import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { take } from 'rxjs';
import { AuthService } from 'src/app/services';
import { User } from 'src/app/services/user/types/user.types';
import { UserService } from 'src/app/services/user/user.service';

@UntilDestroy()
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userId: string;
  user: User | undefined;
  isLoading: boolean = true;


  constructor(private readonly userService: UserService,
    private readonly activatedRoute: ActivatedRoute,
    readonly authService: AuthService) {
    this.userId = this.activatedRoute.snapshot.params['userId'];
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.userService.getUser(this.userId).pipe(untilDestroyed(this)).subscribe(user => {
      this.user = user;
      if (this.authService.userId === this.userId) {
        this.authService.userData = user;
      }
      this.isLoading = false;
    });
  }

}
