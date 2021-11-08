import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-search-box',
  templateUrl: './custom-search-box.component.html',
  styleUrls: ['./custom-search-box.component.scss']
})
export class CustomSearchBoxComponent {

  focus!: boolean;

  @Input() width!: number;
  @Input() searchValue = '';

  @Output() searchValueChange = new EventEmitter<string>();

  onModelChange() {
    this.searchValueChange.emit(this.searchValue);
  }

  onClear() {
    this.searchValue = '';
    this.searchValueChange.emit(this.searchValue);
  }
}
