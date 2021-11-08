import { Component, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CustomInputComponent } from 'src/app/shared/custom-input/custom-input.component';
import { CustomSelectComponent } from 'src/app/shared/custom-select/custom-select.component';

@Component({
  selector: 'app-add-item-definition',
  templateUrl: './add-item-definition.component.html',
  styleUrls: ['./add-item-definition.component.scss']
})
export class AddItemDefinitionComponent {

  @Input() categories!: string[];

  @ViewChild('categorySelect', { read: CustomSelectComponent })
  categorySelect!: CustomSelectComponent;

  @ViewChildren(CustomInputComponent)
  items!: QueryList<CustomInputComponent>;
}
