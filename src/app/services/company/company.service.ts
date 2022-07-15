import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from './types/company.types';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  companyFirebaseUid = new BehaviorSubject<string | undefined>('');

  constructor(private http: HttpClient) { }

  getCompany(id: string): Observable<Company> {
    const url = `${environment.apiUrl}/api/companies/${id}`;
    return this.http.get<Company>(url);
  }
}
