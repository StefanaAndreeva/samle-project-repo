import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss']
})
export class CustomButtonComponent {

  @Input() width!: number;
  @Input() disabled!: boolean;

  @Output() buttonClick = new EventEmitter();

  onClick(event: any) {
    if (!this.disabled) {
      this.buttonClick.emit(event);
    }
  }
}
