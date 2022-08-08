import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Job } from './types/job.type';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  createJob(data: object, uid: string): Observable<unknown> {
    const url = `${environment.apiUrl}/api/companies/${uid}/job`;
    return this.http.post(url, { ...data });
  }

  getJobsByCompanyId(uid: string, lastDate?: number): Observable<Job[]> {
    const url = `${environment.apiUrl}/api/companies/${uid}/jobs`;
    let params;
    if (lastDate) {
      params = new HttpParams().set('lastDate', lastDate);
    }
    return this.http.get<Job[]>(url, { params });
  }

  deleteJob(companyId: string, jobId: string): Observable<unknown> {
    const url = `${environment.apiUrl}/api/job/${companyId}/${jobId}`;
    return this.http.delete(url);
  }

  updateJob(companyId: string, jobId: string, obj: object): Observable<unknown> {
    const url = `${environment.apiUrl}/api/job/${companyId}/${jobId}`;
    return this.http.put(url, { ...obj });
  }
}
