import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from, take } from 'rxjs';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  selection: string = 'user';

  constructor(private readonly router: Router, private authService: AuthService) { }

  signIn() {
    const navigator = from(this.router.navigate(['sign-Up'], { state: { comesFromSignUp: true } }));
    navigator.pipe(take(1)).subscribe(response => {
      if (!response) {
        this.router.navigate(['profile', this.authService.userId]);
      }
    });
  }

}
