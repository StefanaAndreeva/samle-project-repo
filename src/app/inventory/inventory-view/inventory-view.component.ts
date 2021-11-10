import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IUser } from 'src/app/models/user';
import { CustomDetailsListItemComponent } from 'src/app/shared';
import { InventoryViewStateService } from '../inverntory-view-state.service';

@Component({
  selector: 'app-inventory-view',
  templateUrl: './inventory-view.component.html',
  styleUrls: ['./inventory-view.component.scss']
})
export class InventoryViewComponent implements OnInit {

  users$!: Observable<IUser[]>;

  @ViewChildren('items', { read: CustomDetailsListItemComponent })
  items!: QueryList<CustomDetailsListItemComponent>;

  constructor(
    private route: ActivatedRoute,
    public inventoryViewState: InventoryViewStateService,
  ) { }

  ngOnInit() {
    this.users$ = this.route.data.pipe(
      tap(() => this.inventoryViewState.setSelectedUser(null)),
      map((data: any) => data.users)
      );
  }

  userName(user: IUser) {
    return `${user.firstName} ${user.lastName}`;
  }

  trackById(index: number, user: IUser) {
    return user.id;
  }

  onShowDetails(item: CustomDetailsListItemComponent, user: IUser) {
    this.inventoryViewState.setSelectedUser(user);
    this.items.forEach(itm => itm.isSelected = itm === item);
  }
}
