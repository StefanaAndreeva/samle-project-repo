import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-avatar',
  templateUrl: './custom-avatar.component.html',
  styleUrls: ['./custom-avatar.component.scss']
})
export class CustomAvatarComponent {

  @Input() initials!: string;
  @Input() imgSource!: string;

  getSrcUrl() {
    return `url(${this.imgSource})`;
  }
}
