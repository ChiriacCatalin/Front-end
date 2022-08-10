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

  getAllJobs(lastDate?: number): Observable<Job[]> {
    const url = `${environment.apiUrl}/api/jobs`;
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


  getDate(postingTime: string) {
    let value = Math.floor((new Date().getTime() - +postingTime) / 60000);
    const timeName = ['minutes ago', 'hours ago', 'days ago', 'weeks ago', 'months ago', 'years ago'];
    const timeNameSingular = ['minute ago', 'hour ago', 'day ago', 'week ago', 'month ago', 'year ago'];
    const timeDivValues = [60, 24, 7, 4, 12];
    let i;
    for (i = 0; i < 4; ++i) {
      if (value > timeDivValues[i])
        value /= timeDivValues[i];
      else break;
    }
    value = Math.floor(value);
    if (i === 4 && value < 12)
      i = 3;
    return `${Math.floor(value)} ${value === 1 ? timeNameSingular[i] : timeName[i]}`;
  }
}
