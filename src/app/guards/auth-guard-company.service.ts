import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../services';
import { UserToken } from '../services/user-token';
import { UserService } from '../services/user/user.service';
import firebase from 'firebase/compat/app';
import { CompanyService } from '../services/company/company.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardCompanyService implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private companyService: CompanyService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> {
    const condition = this.router.getCurrentNavigation()?.extras?.state?.['comesFromSignUp'];
    let uid: string | undefined = '';
    let userToken: UserToken | null = null;
    if (condition) {
      return this.authService.googleSignIn().pipe(catchError(_ => of(false)), tap(res => {
        if (typeof res !== 'boolean') {
          userToken = this.createToken(res.user?.uid, res.credential as firebase.auth.OAuthCredential);
          this.authService.user.next(userToken); //emit the userToken
        }
      }), switchMap(response => {
        if (typeof response === 'boolean') {
          return of(response); //error on firebase
        }
        uid = response.user?.uid;
        if (response.additionalUserInfo?.isNewUser) {
          this.companyService.companyFirebaseUid.next(uid);
          return of(true);
        }
        if (response.user?.uid === undefined) {
          return of(false);
        }
        return this.companyService.getCompany(response.user.uid);
      }), catchError(_ => {
        this.companyService.companyFirebaseUid.next(uid);
        return of(true);
      }), switchMap(response => {
        if (typeof response !== 'boolean') {
          this.authService.isLoggedIn = true;
          this.authService.userId = uid;
          this.authService.userToken = userToken;
          this.authService.companyData = response;
          localStorage.setItem('userData', JSON.stringify(userToken));
          return of(false);
        }
        return of(response);
      }));
    }
    return false;
  }

  private createToken(id: string | undefined, response: firebase.auth.OAuthCredential) {
    const token = response.idToken;
    const miliseconds = 3600000;// default logged in time
    const expirationDate = new Date(new Date().getTime() + miliseconds);
    return new UserToken(id, token, expirationDate);
  }

}
