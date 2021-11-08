import { Component, ViewChild } from '@angular/core';
import { CustomInputComponent } from 'src/app/shared/custom-input/custom-input.component';

@Component({
  selector: 'app-add-new-category',
  templateUrl: './add-new-category.component.html',
  styleUrls: ['./add-new-category.component.scss']
})
export class AddNewCategoryComponent {

  @ViewChild('category', { read: CustomInputComponent })
  category!: CustomInputComponent;
}
