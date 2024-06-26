import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Applicant } from './types/appliants.types';
import { filterOptions } from './types/filter-options.type';
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

  getJobsByCompanyId(uid: string, lastDate?: string): Observable<Job[]> {
    const url = `${environment.apiUrl}/api/companies/${uid}/jobs`;
    let params;
    if (lastDate) {
      params = new HttpParams().set('lastDate', lastDate);
    }
    return this.http.get<Job[]>(url, { params });
  }

  getAllJobs(lastDate?: string, filters?: filterOptions): Observable<Job[]> {
    const url = `${environment.apiUrl}/api/jobs`;
    let params;
    params = this.setParams(lastDate, filters);
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

  addApplicant(data: object, companyId: string, jobId: string, userId?: string) {
    const url = `${environment.apiUrl}/api/companies/${companyId}/job/${jobId}/applicants/${userId}`;
    return this.http.post(url, { ...data });
  }

  getJobApplicants(companyId: string, jobId: string, lastDate?: string) {
    const url = `${environment.apiUrl}/api/companies/${companyId}/job/${jobId}/applicants`;
    let params;
    if (lastDate) {
      params = new HttpParams().set('lastDate', lastDate);
    }
    return this.http.get<Applicant[]>(url, { params });
  }

  getDate(postingTime: string) {
    let value = Math.floor((new Date().getTime() - +postingTime) / 60000);
    const timeName = ['minutes ago', 'hours ago', 'days ago', 'weeks ago', 'months ago', 'years ago'];
    const timeNameSingular = ['minute ago', 'hour ago', 'day ago', 'week ago', 'month ago', 'year ago'];
    const timeDivValues = [60, 24, 7, 4, 12];
    let i, index = 0;
    for (i = 0; i <= 4; ++i) {
      if (value >= timeDivValues[i]) {
        value /= timeDivValues[i];
        index++;
      }
      else break;
    }
    value = Math.floor(value);

    return `${Math.floor(value)} ${value === 1 ? timeNameSingular[index] : timeName[index]}`;
  }

  private setParams(lastDate?: string, filters?: filterOptions): HttpParams {
    let params = new HttpParams();
    if (lastDate) {
      params = params.set('lastDate', lastDate);
    }
    if (filters) {
      if (filters.date !== null)
        params = params.set('date', filters.date);
      if (filters.experienceLevel !== null)
        params = params.set('experienceLevel', filters.experienceLevel);
      if (filters.jobType !== null)
        params = params.set('jobType', filters.jobType);
      if (filters.onSiteRemote !== null)
        params = params.set('onSiteRemote', filters.onSiteRemote);
      if (filters.country !== null)
        params = params.set('country', filters.country);
      if (filters.city !== null)
        params = params.set('city', filters.city);
    }
    return params;
  }
}
