import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from 'src/app/services';
import { User } from 'src/app/services/user/types/user.types';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userId: string;
  user: User | undefined;


  constructor(private readonly userService: UserService,
    private readonly activatedRoute: ActivatedRoute,
    readonly authService: AuthService) {
    this.userId = this.activatedRoute.snapshot.params['userId'];
  }

  ngOnInit(): void {
    this.userService.getUser(this.userId).pipe(take(1)).subscribe(user => {
      this.user = user;
    });
    
  }
}
