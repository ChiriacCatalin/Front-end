import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './types/user.types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userFirebaseUid = new BehaviorSubject<string | undefined>('');
  //service used for getting or creating an user with a specific ID
  constructor(private http: HttpClient) { }

  getUser(id: string): Observable<User> {
    const url = `${environment.apiUrl}/api/users/${id}`;
    return this.http.get<User>(url);
  }

  createUser(data: object, uid: string | undefined): Observable<unknown> {
    const url = `${environment.apiUrl}/api/users/${uid}`;
    return this.http.post(url, { ...data });
  }

  deleteUserField(fieldName: string, obj: object, uid: string): Observable<unknown> {
    const url = `${environment.apiUrl}/api/users/${uid}/fields`;
    return this.http.delete(url, { body: { fieldName, obj } });
  }

  addUserField(fieldName: string, obj: object, uid: string): Observable<unknown> {
    const url = `${environment.apiUrl}/api/users/${uid}/fields`;
    return this.http.post(url, { fieldName, obj });
  }

  updateUserField(fieldName: string, obj: object, uid: string): Observable<unknown> {
    const url = `${environment.apiUrl}/api/users/${uid}`;
    return this.http.put(url, { fieldName, obj });
  }
}
