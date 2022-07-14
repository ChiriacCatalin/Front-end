import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sign-up-company',
  templateUrl: './sign-up-company.component.html',
  styleUrls: ['./sign-up-company.component.css']
})
export class SignUpCompanyComponent implements AfterViewInit {
  @ViewChild('myModalTriggerCompanyMain') myModalTrigger!: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    console.log(this.myModalTrigger);
    this.myModalTrigger.nativeElement.click();
  }

}
