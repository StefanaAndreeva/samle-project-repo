import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss']
})
export class CustomInputComponent {

  @Input() width!: number;
  @Input() value = '';
  @Input() placeholder = '';
  @Input() type = 'text';
}
