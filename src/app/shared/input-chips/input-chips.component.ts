import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Chips } from './chips';

@Component({
  selector: 'app-input-chips',
  templateUrl: './input-chips.component.html',
  styleUrls: ['./input-chips.component.css']
})
export class InputChipsComponent implements OnChanges {
  @ViewChild('itemInput') itemInput!: ElementRef<HTMLInputElement>;
  @Input() fields?: Chips;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  itemCtrl = new FormControl(); // the input area
  filteredItems: Observable<string[]>;
  label: string = '';
  itemsEntered?: string[] = [];
  itemOptions: string[] = [];


  constructor() {
    this.filteredItems = this.itemCtrl.valueChanges.pipe(
      startWith(null),
      map((item: string | null) => (item ? this._filter(item) : this.itemOptions.slice())),
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.fields) {
      this.label = this.fields.label;
      this.itemsEntered = this.fields.dataEntered;
      this.itemOptions = this.fields.dataOptions;
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add the item
    if (value) {
      this.itemsEntered!.push(value);
    }
    // Clear the input value
    event.chipInput!.clear();
    this.itemCtrl.setValue(null);
  }

  remove(item: string): void {
    const index = this.itemsEntered!.indexOf(item);
    if (index >= 0) {
      this.itemsEntered!.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.itemsEntered!.push(event.option.viewValue);
    this.itemInput.nativeElement.value = '';
    this.itemCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.itemOptions.filter(item => item.toLowerCase().includes(filterValue));
  }
}