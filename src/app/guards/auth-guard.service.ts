import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../services';
import { UserToken } from '../services/user-token';
import { UserService } from '../services/user/user.service';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private readonly authService: AuthService, private router: Router, private userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const condition = this.router.getCurrentNavigation()?.extras?.state?.['comesFromSignUp'];
    let uid: string | undefined = '';
    let userToken: UserToken | null = null;
    if (condition) {
      return this.authService.googleSignIn().pipe(catchError(_ => of(false)), tap(res => {
        console.log("tap", res);
        if (typeof res !== 'boolean') { // if no error occured on firebase
          userToken = this.createToken(res.user?.uid, res.credential as firebase.auth.OAuthCredential)
          this.authService.user.next(userToken); //emit the userToken
        }
      }), switchMap(response => {
        if (typeof response === 'boolean') {
          return of(response); //error on firebase
        }
        uid = response.user?.uid;
        if (response.additionalUserInfo?.isNewUser) {
          return of(true); //continue to the designated path
        }
        if (response.user?.uid === undefined) {
          return of(false); //no UID found
        }
        return of(true);
      }))
    }
    return false;
  }

  private createToken(id: string | undefined, response: firebase.auth.OAuthCredential) {
    console.log(response);
    const token = response.idToken;
    const miliseconds = 3600000;// default logged in time
    const expirationDate = new Date(new Date().getTime() + miliseconds);
    return new UserToken(id, token, expirationDate);
  }

}
