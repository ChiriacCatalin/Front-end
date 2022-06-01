import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services';
import { UserToken } from './services/user-token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'licenta';

  constructor(private readonly router: Router, private authService: AuthService){
    const data = localStorage.getItem('userData');
    if (data) {
      const userData: {id: string, _token: string, _tokenExpirationDate: string} = JSON.parse(data);

      const loadedUser = new UserToken(userData.id, userData._token, new Date(userData._tokenExpirationDate));

      if (loadedUser.token) {
        this.authService.isLoggedIn = true;
        this.authService.userToken = loadedUser;
        this.authService.userId = loadedUser.id;
      }
    }
  }
}
