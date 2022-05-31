import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services';
import { User } from 'src/app/services/user/types/user.types';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.css']
})
export class WorkExperienceComponent implements OnChanges {
  @Input() user?: User;

  userId: string;
  isLoading: boolean = true; 

  constructor(
    private readonly userService: UserService,
    private activatedRoute: ActivatedRoute,
    readonly authService: AuthService,
    private sanitizer: DomSanitizer) {
    this.userId = this.activatedRoute.snapshot.params['userId'];
  }

  ngOnChanges(): void {
    if (this.user) {
      this.isLoading = false;
    }
  }

  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
