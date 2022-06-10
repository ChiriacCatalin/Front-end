import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { from, switchMap, take } from 'rxjs';
import { AuthService } from 'src/app/services';
import { UserToken } from 'src/app/services/user-token';
import { Project } from 'src/app/services/user/types/projects.types';
import { UserService } from 'src/app/services/user/user.service';

@UntilDestroy()
@Component({
  selector: 'app-signup-user-personal-projects',
  templateUrl: './signup-user-personal-projects.component.html',
  styleUrls: ['./signup-user-personal-projects.component.css']
})
export class SignupUserPersonalProjectsComponent implements OnChanges {
  @ViewChild('myModalTriggerSkils') myModalTrigger!: ElementRef;
  @Input() project?: Project;
  @Input() uniqueId?: string;
  @Input() newElement: boolean = false;
  formGroup: FormGroup;
  index?: number;

  constructor(private readonly userService: UserService, private readonly router: Router, private readonly authService: AuthService) {
    this.formGroup = new FormGroup({
      projectName: new FormControl(null, [Validators.required]),
      projectStartDate: new FormControl(null, Validators.required),
      projectEndDate: new FormControl(null, []),
      projectDescription: new FormControl(null, []),
      projectVideo: new FormControl(null, []),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.project) {
      let project_copy = { ...this.project };
      this.formGroup.setValue(project_copy);
      this.index = +this.uniqueId!.slice(7);
    }
  }

  onSave() {
    this.storeUserProjects();
    // console.log(this.authService.userData);
    const data = this.formGroup.getRawValue();
    let userId: string | undefined = '';
    this.myModalTrigger.nativeElement.click();
  }

  onExit() {
    if (!this.project && !this.newElement)
      this.router.navigate(['']);
  }

  onSkip() {
    this.myModalTrigger.nativeElement.click();
  }

  onUpdate() {
    this.authService.userData!.projects![this.index!] = this.formGroup.getRawValue();
    // console.log(this.authService.userData!.projects!);
    this.userService.updateUserField('projects', this.authService.userData.projects!, this.authService.userId!)
      .pipe(take(1)).subscribe(_ => {
        from(this.router.navigate([''], { skipLocationChange: true })).pipe(take(1)).subscribe(_ => {
          this.router.navigate(['/profile', this.authService.userId]);
        });
      });
  }

  onDelete() {
    this.userService.deleteUserField('projects', this.project!, this.authService.userId!).pipe(take(1)).subscribe(_ => {
      this.authService.userData!.projects!.splice(this.index!, 1);
    });
  }

  onAdd() {
    this.userService.addUserField('projects', this.formGroup.getRawValue(), this.authService.userId!).pipe(take(1)).subscribe(_ => {
      from(this.router.navigate([''], { skipLocationChange: true })).pipe(take(1)).subscribe(_ => {
        this.router.navigate(['/profile', this.authService.userId]);
      });
    });
  }

  private storeUserProjects() {
    const data = this.formGroup.getRawValue();
    this.authService.userData.projects?.push({ ...data });
  }

}
