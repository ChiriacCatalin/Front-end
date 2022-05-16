import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
      HeaderComponent
  ],
  declarations: [HeaderComponent]
})
export class SharedModule { }
