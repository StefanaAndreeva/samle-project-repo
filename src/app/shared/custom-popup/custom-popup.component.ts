import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-popup',
  templateUrl: './custom-popup.component.html',
  styleUrls: ['./custom-popup.component.scss']
})
export class CustomPopupComponent {

  show!: boolean;

  @Input() title!: string;
  @Input() width!: string;
  @Input() disableActionButton!: boolean;
  @Input() hasCloseButton!: boolean;
  @Input() hasActionButtons = true;

  @Output() popupClose = new EventEmitter<boolean>();

  open() {
    this.show = true;
  }

  close() {
    this.show = false;
  }

  onClose(value: boolean) {
    this.close();
    this.popupClose.emit(value);
  }
}
