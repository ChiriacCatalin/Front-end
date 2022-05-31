import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(public readonly authService: AuthService, private readonly router: Router) { }

  onLogout() {
    this.authService.userToken = null;
    this.authService.userData = {};
    this.authService.isLoggedIn = !this.authService.isLoggedIn;
    from(this.router.navigate(['/profile'], { skipLocationChange: true })).subscribe(_ => {
      localStorage.removeItem('userData');
      this.authService.userId = undefined;
      this.router.navigate(['']);
    });
  }

}
