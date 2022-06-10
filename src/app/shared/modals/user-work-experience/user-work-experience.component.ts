import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { from, switchMap, take } from 'rxjs';
import { AuthService } from 'src/app/services';
import { Job } from 'src/app/services/user/types/jobs.types';
import { UserService } from 'src/app/services/user/user.service';

@UntilDestroy()
@Component({
  selector: 'app-edit-user-work-experience',
  templateUrl: './user-work-experience.component.html',
  styleUrls: ['./user-work-experience.component.css']
})
export class UserWorkExperienceComponent implements OnChanges {
  // @ViewChild('myModalTrigger') myModalTrigger!: ElementRef;
  @ViewChild('myModalTriggerEducation') myModalTrigger!: ElementRef;
  @Input() job?: Job;
  @Input() uniqueId?: string;
  @Input() newElement: boolean = false;
  formGroup: FormGroup;
  index?: number;

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {
    this.formGroup = new FormGroup({
      company: new FormControl(this.job ? this.job?.company : null, [Validators.required, Validators.minLength(2)]),
      workPosition: new FormControl(null, [Validators.required]),
      workStartDate: new FormControl(null, Validators.required),
      workEndDate: new FormControl(null, []),
      workDescription: new FormControl(null, []),
      workVideo: new FormControl(null, []),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.job) {
      let job_copy = { ...this.job };
      this.formGroup.setValue(job_copy);
      this.index = +this.uniqueId!.slice(3);
    }

  }

  onExit() {
    if (!this.job && !this.newElement)
      this.router.navigate(['']);
    // console.log(this.job);
  }

  onSkip() {
    this.myModalTrigger.nativeElement.click();
  }

  onSave() {
    this.storeUserWork();
    console.log(this.authService.userData);
    this.myModalTrigger.nativeElement.click();
  }

  onUpdate() {
    this.authService.userData!.jobs![this.index!] = this.formGroup.getRawValue();
    this.userService.updateUserField('jobs', this.authService.userData.jobs!, this.authService.userId!)
      .pipe(take(1)).subscribe(_ => {
        from(this.router.navigate([''], { skipLocationChange: true })).pipe(take(1)).subscribe(_ => {
          this.router.navigate(['/profile', this.authService.userId]);
        });
      });
  }

  onDelete() {
    this.userService.deleteUserField('jobs', this.job!, this.authService.userId!).pipe(take(1)).subscribe(_ => {
      this.authService.userData!.jobs!.splice(this.index!, 1);
    });
  }

  onAdd() {
    this.userService.addUserField('jobs', this.formGroup.getRawValue(), this.authService.userId!).pipe(take(1)).subscribe(_ => {
      from(this.router.navigate([''], { skipLocationChange: true })).pipe(take(1)).subscribe(_ => {
        this.router.navigate(['/profile', this.authService.userId]);
      });
    });
  }

  private storeUserWork() {
    const data = this.formGroup.getRawValue();
    this.authService.userData.jobs?.push({ ...data });
  }

}
