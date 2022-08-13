import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { UserToken } from './user-token';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { User } from './user/types/user.types';
import { Company } from './company/types/company.types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<UserToken | null>(null);

  isLoggedIn = false;
  userId: string | undefined = '';
  userToken: UserToken | null = null;

  userData: User;
  companyData?: Company;

  constructor(private readonly afAuth: AngularFireAuth, private router: Router) {
    this.userData = this.initializeUser();
  }

  googleSignIn(): Observable<firebase.auth.UserCredential> {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.userData = this.initializeUser();
    return from(this.afAuth.signInWithPopup(provider));
  }

  signOut() {
    this.afAuth.signOut();
    this.router.navigate(['sign-In']);
  }

  private initializeUser(): User {
    return { jobs: [], projects: [], schools: [], fieldsOfExpertise: [], toolsAndLanguages: [], personalSkills: [], hobbies: [] };
  }
}
