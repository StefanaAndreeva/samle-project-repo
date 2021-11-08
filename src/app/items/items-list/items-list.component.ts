import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IInventoryItemDef, IInventoryItemDetails } from 'src/app/models/inventory';
import { IItem } from 'src/app/models/item';
import { InventoryManagementService } from 'src/app/services/inventory-management.service';
import { StoreService } from 'src/app/services/store.service';
import { CustomPopupComponent } from 'src/app/shared/custom-popup/custom-popup.component';
import { AddItemDefinitionComponent } from '../add-item-definition/add-item-definition.component';
import { AddNewCategoryComponent } from '../add-new-category/add-new-category.component';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {

  items$!: Observable<IItem[]>;
  definitions$!: Observable<IInventoryItemDef[]>;

  title!: string;

  @ViewChild('detailsPopup', { read: CustomPopupComponent })
  detailsPopup!: CustomPopupComponent;

  @ViewChild('newItemPopup', { read: CustomPopupComponent })
  newItemPopup!: CustomPopupComponent;

  @ViewChild('category', { read: AddNewCategoryComponent })
  category!: AddNewCategoryComponent;

  get currentUser() {
    return this.store.currentUser;
  }

  constructor(
    private inventory: InventoryManagementService,
    private route: ActivatedRoute,
    private store: StoreService,
  ) { }

  ngOnInit() {
    this.definitions$ = this.route.data.pipe(map((data: any) => data.items));
  }

  isAddNewDefButtonDisabled(form: AddItemDefinitionComponent) {
      return !form.categorySelect?.selectedItem || (form && form.items.some(i => i.value === ''));
  }

  isNewCategoryButtonDisabled(form: AddNewCategoryComponent) {
    return form.category?.value === '';
  }

  getCategories(definitions: IInventoryItemDef[]) {
    return definitions.map(d => d.category);
  }

  openDetailsView(category: string, item: IInventoryItemDetails) {
    this.title = `${item.manufacturer} ${item.series} ${item.model}`;
    this.detailsPopup.open();
    this.items$ = this.inventory.getAllItems()
      .pipe(
        map(data => data.filter(d => d.category === category && d.model === item.id)
        .sort((a: any, b: any) => {
          return b.assignedDate - a.assignedDate;
        }))
      )
  }

  addNewItemDefinition(event: boolean) {
    if (!event) {
      return;
    }
    // TO DO: to be implemented after having a real ENDPOINT
  }

  addNewCategory(event: boolean) {
    if (!event) {
      return;
    }
    // TO DO: to be implemented after having a real ENDPOINT
  }
}


