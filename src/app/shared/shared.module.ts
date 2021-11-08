import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomLinkButtomComponent } from './custom-link-buttom/custom-link-buttom.component';
import { CustomDetailsListComponent } from './custom-details-list/custom-details-list.component';
import { CustomDetailsListItemComponent } from './custom-details-list/custom-details-list-item/custom-details-list-item.component';
import { CustomAvatarComponent } from './custom-avatar/custom-avatar.component';
import { CustomPopupComponent } from './custom-popup/custom-popup.component';
import { CustomButtonComponent } from './custom-button/custom-button.component';
import { CustomSearchBoxComponent } from './custom-search-box/custom-search-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomSelectComponent } from './custom-select/custom-select.component';
import { CustomInputComponent } from './custom-input/custom-input.component';

@NgModule({
  declarations: [
    CustomLinkButtomComponent,
    CustomDetailsListComponent,
    CustomDetailsListItemComponent,
    CustomAvatarComponent,
    CustomPopupComponent,
    CustomButtonComponent,
    CustomSearchBoxComponent,
    CustomSelectComponent,
    CustomInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CustomLinkButtomComponent,
    CustomDetailsListComponent,
    CustomDetailsListItemComponent,
    CustomAvatarComponent,
    CustomPopupComponent,
    CustomButtonComponent,
    CustomSearchBoxComponent,
    CustomSelectComponent,
    CustomInputComponent
  ]
})
export class SharedModule { }
