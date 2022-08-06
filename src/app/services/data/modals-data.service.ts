import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalsDataService {
  jobTypes: string[] = ['Full-time', 'Part-time', 'Internship', 'Contract'];
  experienceLevels: string[] = ['Internship', 'Entry level', 'Mid level', 'Senior level', 'Director', 'Executive'];
  siteRemote: string[] = ['On-Site', 'Remote', 'Hybrid'];

  country: string[] = ['Romania', 'Belgia', 'Franta', 'Germania', 'Spania', 'Grecia'];
  city: string[] = ['Iasi', 'Bucuresti', 'Cluj', 'Brasov', 'Ilfov', 'Berlin', 'Frankfurt', 'Paris', 'Madrid'];


  constructor() { }

}
