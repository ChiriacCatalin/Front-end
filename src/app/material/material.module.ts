import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';


const components = [
  MatFormFieldModule,
  MatInputModule,
  MatChipsModule,
  MatIconModule,
  MatSelectModule,
  MatSnackBarModule,
  MatButtonModule,
  MatToolbarModule,
  MatAutocompleteModule,
  MatRadioModule
];

@NgModule({
  imports: [...components],
  exports: [...components]
})
export class MaterialModule { }