import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { from, switchMap } from 'rxjs';
import { AuthService } from 'src/app/services';
import { ImageService } from 'src/app/services/image/image.service';
import { User } from 'src/app/services/user/types/user.types';
import { UserService } from 'src/app/services/user/user.service';
import { toBase64 } from 'src/app/shared/utils';

@UntilDestroy()
@Component({
  selector: 'app-user-main-info',
  templateUrl: './user-main-info.component.html',
  styleUrls: ['./user-main-info.component.css']
})
export class UserMainInfoComponent implements OnChanges {
  @ViewChild('uploadImageRef') uploadImageRef!: ElementRef;
  @Input() user?: User;

  selectedFile: File | null = null;
  userId: string;
  address?: string;
  isLoading: boolean = true;

  constructor(
    private readonly userService: UserService,
    private activatedRoute: ActivatedRoute,
    readonly authService: AuthService,
    private imageService: ImageService,
    private sanitizer: DomSanitizer) {
    this.userId = this.activatedRoute.snapshot.params['userId'];
  }

  ngOnChanges(): void {
    if (this.user) {
      this.address = `${this.user.mainInfo?.city}, ${this.user.mainInfo?.country}`;
      this.isLoading = false;
    }
  }

  sanitize(url: string | undefined) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url!);
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    // console.log(this.selectedFile);
    this.uploadImage();
  }
  
  uploadButtonClicked() {
    this.uploadImageRef.nativeElement.click();
  }

  uploadImage(): void {
    //upload the profile image, and get the updated user from the backend
    this.isLoading = true;
    const toBase64Obs = from(toBase64(this.selectedFile!));
    toBase64Obs
      .pipe(
        switchMap(base64 => {
          const value = base64 as string;
          return this.imageService.uploadImage({ image: value }, this.userId);
        })
      )
      .pipe(
        untilDestroyed(this),
        switchMap(response => {
          return this.userService.getUser(this.userId);
        })
      )
      .subscribe(user => {
        this.user = user;
        this.isLoading = false;
      });
  }
}
