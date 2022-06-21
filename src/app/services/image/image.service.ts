import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private readonly httpClient: HttpClient) {

  }

  uploadImage(data: { image: string, userType: string }, userId: string): Observable<unknown> {
    const url = `${environment.apiUrl}/api/images/${userId}`;
    return this.httpClient.post(url, data);
  }

}
