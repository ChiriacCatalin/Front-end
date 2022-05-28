import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user-work-experience',
  templateUrl: './user-work-experience.component.html',
  styleUrls: ['./user-work-experience.component.css']
})
export class UserWorkExperienceComponent implements OnInit,AfterViewInit {
  @ViewChild('myModalTrigger') myModalTrigger!: ElementRef;
  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      workPosition: new FormControl(null, [Validators.required]),
      workStartDate: new FormControl(null, Validators.required),
      workEndDate: new FormControl(null, []),
      workDescription: new FormControl(null, []),
      workVideo: new FormControl(null, []),
    });
  }
  ngOnInit(): void {
    // this.formGroup = new FormGroup({
    //   workPosition: new FormControl(null, [Validators.required]),
    //   workStartDate: new FormControl(null, Validators.required),
    //   workEndDate: new FormControl(null, []),
    //   workDescription: new FormControl(null, []),
    //   workVideo: new FormControl(null, []),
    // });
  }

  ngAfterViewInit(): void {
    this.myModalTrigger.nativeElement.click();
  }
  
  onSave(){

  }

}
