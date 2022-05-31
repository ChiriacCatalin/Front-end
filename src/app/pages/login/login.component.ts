import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('myModalTriggerInfo') myModalTrigger!: ElementRef;
  constructor() { }

  ngAfterViewInit(): void {
    this.myModalTrigger.nativeElement.click();
  }

}
