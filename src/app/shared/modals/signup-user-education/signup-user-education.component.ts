import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from, take } from 'rxjs';
import { AuthService } from 'src/app/services';
import { School } from 'src/app/services/user/types/schools.types';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-signup-user-education',
  templateUrl: './signup-user-education.component.html',
  styleUrls: ['./signup-user-education.component.css']
})
export class SignupUserEducationComponent implements OnChanges {
  @ViewChild('myModalTriggerProject') myModalTrigger!: ElementRef;
  @Input() school?: School;
  @Input() uniqueId?: string;
  @Input() newElement: boolean = false;

  formGroup: UntypedFormGroup;
  index?: number;


  constructor(private authService: AuthService, private router: Router, private userService: UserService) {
    this.formGroup = new UntypedFormGroup({
      school: new UntypedFormControl(null, [Validators.required]),
      schoolDegree: new UntypedFormControl(null, Validators.required),
      schoolStartDate: new UntypedFormControl(null, Validators.required),
      schoolEndDate: new UntypedFormControl(null, []),
      schoolDescription: new UntypedFormControl(null, []),
      schoolVideo: new UntypedFormControl(null, []),
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.school) {
      let school_copy = { ...this.school };
      this.formGroup.setValue(school_copy);
      this.index = +this.uniqueId!.slice(6);
    }
  }

  onSave() {
    this.storeUserEducation();
    // console.log(this.authService.userData);
    this.myModalTrigger.nativeElement.click();
  }

  onExit() {
    if (!this.school && !this.newElement)
      this.router.navigate(['']);
  }

  onUpdate() {
    this.authService.userData!.schools![this.index!] = this.formGroup.getRawValue();
    // console.log(this.authService.userData!.schools!);
    this.userService.updateUserField('schools', this.authService.userData.schools!, this.authService.userId!)
      .pipe(take(1)).subscribe(_ => {
        from(this.router.navigate([''], { skipLocationChange: true })).pipe(take(1)).subscribe(_ => {
          this.router.navigate(['/profile', this.authService.userId]);
        });
      });
  }

  onDelete() {
    this.userService.deleteUserField('schools', this.school!, this.authService.userId!).pipe(take(1)).subscribe(_ => {
      this.authService.userData!.schools!.splice(this.index!, 1);
    });
  }

  onAdd() {
    this.userService.addUserField('schools', this.formGroup.getRawValue(), this.authService.userId!).pipe(take(1)).subscribe(_ => {
      from(this.router.navigate([''], { skipLocationChange: true })).pipe(take(1)).subscribe(_ => {
        this.router.navigate(['/profile', this.authService.userId]);
      });
    });
  }

  private storeUserEducation() {
    const data = this.formGroup.getRawValue();
    this.authService.userData.schools?.push({ ...data });
  }
}
