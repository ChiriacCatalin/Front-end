import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from, take } from 'rxjs';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-sign-in-dropdown',
  templateUrl: './sign-in-dropdown.component.html',
  styleUrls: ['./sign-in-dropdown.component.css']
})
export class SignInDropdownComponent {

  constructor(private readonly router: Router, private authService: AuthService) { }

  signUp() {
    const navigator = from(this.router.navigate(['sign-Up'], { state: { comesFromSignUp: true } }));
    navigator.pipe(take(1)).subscribe(response => {
      if (!response) {
        this.router.navigate(['profile', this.authService.userId]);
      }
    });
  }
}
