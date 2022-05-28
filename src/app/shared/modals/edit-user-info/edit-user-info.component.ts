import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user-info',
  templateUrl: './edit-user-info.component.html',
  styleUrls: ['./edit-user-info.component.css']
})
export class EditUserInfoComponent implements OnInit, AfterViewInit {
  @ViewChild('myModalTrigger') myModalTrigger!: ElementRef;
  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      country: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      birthdate: new FormControl(null, []),
      email: new FormControl(null, [Validators.required, Validators.email]),
      studied_at: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      works_at: new FormControl(null,[])
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.myModalTrigger.nativeElement.click();
  }

  onSave() {

  }
}
