import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { UserToken } from './user-token';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { User } from './user/types/user.types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<UserToken | null>(null);

  isLoggedIn = false;
  userId: string | undefined = '';
  userToken: UserToken | null = null;

  userData: User = {};

  constructor(private readonly afAuth: AngularFireAuth,
    private router: Router
  ) { }

  googleSignIn(): Observable<firebase.auth.UserCredential> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return from(this.afAuth.signInWithPopup(provider));
  }

  signOut() {
    this.afAuth.signOut();
    this.router.navigate(['']);
  }

}
