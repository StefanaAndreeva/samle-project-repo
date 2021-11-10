import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { IInventoryItemDef } from 'src/app/models/definition';
import { InventoryManagementService } from 'src/app/services/inventory-management.service';
import { CustomSelectComponent } from 'src/app/shared/custom-select/custom-select.component';

export interface IItemAddedArgs {
  category: string;
  itemId: number;
}

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {

  definitions$!: Observable<IInventoryItemDef[]>;

  @Output() add = new EventEmitter<IItemAddedArgs>();
  @Output() cancel = new EventEmitter();

  @ViewChild('categorySelect', { read: CustomSelectComponent })
  categorySelect!: CustomSelectComponent;

  @ViewChild('modelSelect', { read: CustomSelectComponent })
  modelSelect!: CustomSelectComponent;

  constructor(
    private inventoryService: InventoryManagementService,
    ) { }

  ngOnInit(): void {
    this.definitions$ = this.inventoryService.getInventoryDefinitions();
  }

  get disabled() {
    return !this.categorySelect?.selectedItem;
  }

  get actionButtonDisabled() {
    return !this.categorySelect?.selectedItem || !this.modelSelect?.selectedItem;
  }

  getCategories(definitions: IInventoryItemDef[]) {
    return Array.from(this.inventoryService.getUniqueCategories(definitions));
  }

  getModels(definitions: IInventoryItemDef[], category: string) {
    const items = definitions.filter(def => def.category === category);
    return items ? items.map(e => `${e.manufacturer} ${e.series} ${e.model}`) : [];
  }

  onItemAdd(definitions: IInventoryItemDef[]) {
    if (!this.actionButtonDisabled) {
      // const definition = definitions.find(def => def.category === this.categorySelect.selectedItem);
      // const models = definition?.items;
      // const id = models?.find(m => {
      //   return this.modelSelect.selectedItem.includes(m.manufacturer)
      //     && m.series && this.modelSelect.selectedItem.includes(m.series)
      //     && m.model && this.modelSelect.selectedItem.includes(m.model);
      // })?.id;

      // if (this.categorySelect?.selectedItem && id) {
      //   this.add.emit({
      //     category: this.categorySelect?.selectedItem,
      //     itemId: id
      //   });
      // }
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
