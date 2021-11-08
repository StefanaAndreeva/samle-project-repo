import { Component, Input } from '@angular/core';
import { IItem } from 'src/app/models/item';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent {
  @Input() items!: IItem[];
}
