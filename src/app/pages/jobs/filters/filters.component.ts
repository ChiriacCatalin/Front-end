import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalsDataService } from 'src/app/services/data/modals-data.service';
import { JobService } from 'src/app/services/jobs/job.service';
import { filterOptions } from 'src/app/services/jobs/types/filter-options.type';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  @Output() filterOptions = new EventEmitter<filterOptions>();
  filterFormGroup: FormGroup;

  jobTypes?: string[];
  experienceLevels?: string[];
  siteRemote?: string[];
  city?: string[];
  country?: string[];
  filters? : filterOptions;

  constructor(private modalsData: ModalsDataService,
    private jobService: JobService) {
    this.filterFormGroup = new FormGroup({
      date: new FormControl(null),
      jobType: new FormControl(null),
      experienceLevel: new FormControl(null),
      onSiteRemote: new FormControl(null),
      city: new FormControl(null, [Validators.maxLength(150), Validators.min(2)]),
      country: new FormControl(null, [Validators.maxLength(150),
      Validators.min(2), this.existingCountry.bind(this)]),
    });
    this.jobTypes = modalsData.jobTypes;
    this.experienceLevels = modalsData.experienceLevels;
    this.siteRemote = modalsData.siteRemote;
    this.city = modalsData.city;
    this.country = modalsData.country;
  }


  existingCountry(control: AbstractControl): { [s: string]: boolean } | null {
    if (control.touched === false || control.value?.trim() === '') {
      return null;
    }
    if (!(this.country?.indexOf(control.value) !== -1)) {
      return { 'notValid': true };
    }
    return null;
  }

  onApplyFilters() {
    // console.log(this.filterFormGroup.getRawValue());
    this.filters = this.filterFormGroup.getRawValue();
    this.filterOptions.emit(this.filters);
  }

}
