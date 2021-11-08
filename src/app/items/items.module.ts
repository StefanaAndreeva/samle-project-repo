import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsRoutingModule } from './items-routing.module';
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { SharedModule } from '../shared/shared.module';
import { AddItemDefinitionComponent } from './add-item-definition/add-item-definition.component';
import { AddNewCategoryComponent } from './add-new-category/add-new-category.component';

@NgModule({
  declarations: [
    ItemsListComponent,
    ItemDetailComponent,
    AddItemDefinitionComponent,
    AddNewCategoryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ItemsRoutingModule
  ]
})
export class ItemsModule { }
