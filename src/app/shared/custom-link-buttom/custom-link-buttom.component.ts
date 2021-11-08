import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-link-buttom',
  templateUrl: './custom-link-buttom.component.html',
  styleUrls: ['./custom-link-buttom.component.scss']
})
export class CustomLinkButtomComponent {

  @Input() isHeader!: boolean;
  @Input() icon!: string;
  @Input() text!: string;
  @Input() link!: string;
  @Input() height!: number;
  @Input() width!: string;
  @Input() disabled!: boolean;

  @Output() buttonClick = new EventEmitter();

  @HostListener('click', ['$event'])
  onClick(event: any) {
    if (!this.disabled) {
      this.buttonClick.emit(event);
    }
  }

}
