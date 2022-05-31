import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services';
import { User } from 'src/app/services/user/types/user.types';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-main-info',
  templateUrl: './user-main-info.component.html',
  styleUrls: ['./user-main-info.component.css']
})
export class UserMainInfoComponent implements OnChanges {
  @Input() user?: User;

  userId: string;
  address?: string;
  isLoading: boolean = true;

  constructor(
    private readonly userService: UserService,
    private activatedRoute: ActivatedRoute,
    readonly authService: AuthService) {
    this.userId = this.activatedRoute.snapshot.params['userId'];
  }

  ngOnChanges(): void {
    if (this.user) {
      this.address = `${this.user.mainInfo?.city}, ${this.user.mainInfo?.country}`;
      this.isLoading = false;
    }
  }
}
