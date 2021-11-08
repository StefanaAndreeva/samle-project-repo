import { Component, ElementRef, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent {

  @Input() items!: Array<string>;
  @Input() width!: number;
  @Input() selectedItem!: string;
  @Input() disabled!: boolean;

  isOpen!: boolean;

  get icon() {
    return this.isOpen ? 'expand_less' : 'expand_more' ;
  }

  @HostListener('document:click', ['$event'])
  clickOnDocument(event: any) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  constructor(private elementRef: ElementRef) {}

  onOpen() {
    if (this.disabled) {
      return;
    }
    this.isOpen = !this.isOpen;
  }

  onOptionSelect(item: string) {
    this.selectedItem = item;
    this.isOpen = false;
  }
}
