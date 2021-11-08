import { Component, Input, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IInventoryItemDetails } from 'src/app/models/inventory';
import { IUser } from 'src/app/models/user';
import { CustomDetailsListItemComponent, ICustomDetailsListItemSelectedEventArg } from 'src/app/shared';
import { InventoryViewStateService } from '../inverntory-view-state.service';

@Component({
  selector: 'app-inventory-details',
  templateUrl: './inventory-details.component.html',
  styleUrls: ['./inventory-details.component.scss']
})
export class InventoryDetailsComponent implements OnInit, OnDestroy {

  @Input() user!: IUser;

  @ViewChildren('items', { read: CustomDetailsListItemComponent })
  items!: QueryList<CustomDetailsListItemComponent>;

  private _destroy$ = new Subject<boolean>();

  constructor(
    private inventoryViewState: InventoryViewStateService,
  ) { }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  ngOnInit(): void {
    this.inventoryViewState.selectedUser$
    .pipe(takeUntil(this._destroy$))
    .subscribe(() => {
      requestAnimationFrame(() => this.items.toArray()[0].isExpanded = true);
    });
  }

  getItemInfo(item: IInventoryItemDetails) {
    return `${item.series} ${item.model}`
  }

  onItemSelected(event: ICustomDetailsListItemSelectedEventArg) {
    this.items.forEach(itm => itm.isExpanded = event.value && itm === event.item);
  }
}
