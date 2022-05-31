import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-edit-user-work-experience',
  templateUrl: './user-work-experience.component.html',
  styleUrls: ['./user-work-experience.component.css']
})
export class UserWorkExperienceComponent {
  // @ViewChild('myModalTrigger') myModalTrigger!: ElementRef;
  @ViewChild('myModalTriggerEducation') myModalTrigger!: ElementRef;
  formGroup: FormGroup;

  constructor(private authService: AuthService) {
    this.formGroup = new FormGroup({
      company: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      workPosition: new FormControl(null, [Validators.required]),
      workStartDate: new FormControl(null, Validators.required),
      workEndDate: new FormControl(null, []),
      workDescription: new FormControl(null, []),
      workVideo: new FormControl(null, []),
    });
  }

  // ngAfterViewInit(): void {
  //   this.myModalTrigger.nativeElement.click();
  // }

  onSave() {
    this.storeUserWork();
    console.log(this.authService.userData);
    this.myModalTrigger.nativeElement.click();
  }

  private storeUserWork() {
    const data = this.formGroup.getRawValue();
    this.authService.userData.jobs?.push({ ...data });
  }

}
