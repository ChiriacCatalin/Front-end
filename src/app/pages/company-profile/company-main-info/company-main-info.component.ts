import { I } from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { from, switchMap } from 'rxjs';
import { AuthService } from 'src/app/services';
import { CompanyService } from 'src/app/services/company/company.service';
import { Company } from 'src/app/services/company/types/company.types';
import { ImageService } from 'src/app/services/image/image.service';
import { toBase64 } from 'src/app/shared/utils';

@UntilDestroy()
@Component({
  selector: 'app-company-main-info',
  templateUrl: './company-main-info.component.html',
  styleUrls: ['./company-main-info.component.css']
})
export class CompanyMainInfoComponent implements OnChanges {
  @ViewChild('uploadImageRef') uploadImageRef!: ElementRef;
  @Input() company?: Company;

  companyId: string;
  selectedFile: File | null = null;
  isLoading: boolean = true;

  constructor(
    private readonly companyServie: CompanyService,
    private activatedRoute: ActivatedRoute,
    readonly authService: AuthService,
    private sanitizer: DomSanitizer,
    private imageService: ImageService) {
    this.companyId = this.activatedRoute.snapshot.params['companyId'];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.company) {
      this.isLoading = false;
    }
  }

  sanitize(url: string | undefined) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url!);
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.uploadImage();
  }

  uploadButtonClicked() {
    this.uploadImageRef.nativeElement.click();
  }

  uploadImage(): void {
    this.isLoading = true;
    const toBase64Obs = from(toBase64(this.selectedFile!));
    toBase64Obs.pipe(
      switchMap(base64 => {
        const value = base64 as string;
        return this.imageService.uploadImage({ image: value, userType: 'company' }, this.companyId);
      })
    ).pipe(
      untilDestroyed(this), switchMap(_ => {
        return this.companyServie.getCompany(this.companyId);
      })
    ).subscribe(company => {
      this.company = company;
      this.isLoading = false;
    });
  }
}
