import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { IItem } from 'src/app/models/item';
import { IUser } from 'src/app/models/user';
import { StoreService } from 'src/app/services/store.service';
import { UsersManagementService } from 'src/app/services/users-management.service';
import { CustomPopupComponent } from 'src/app/shared/custom-popup/custom-popup.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  user$!: Observable<IUser | undefined>;
  selectedItem!: IItem;
  showAddInventoryItem!: boolean;

  @ViewChild('confirmDialog', { read: CustomPopupComponent })
  confirmDialog!: CustomPopupComponent;

  get currentUser() {
    return this.store.currentUser;
  }

  constructor(
    private route: ActivatedRoute,
    private store: StoreService,
    private usersService: UsersManagementService,
  ) {}

  ngOnInit() {
    this.user$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.usersService.getUsersWithInventory()
          .pipe(
            tap(() => this.showAddInventoryItem = false),
            map(users => {
              return users.find(e => e.id.toString() === params.get('id')!)
            })
          )
      })
    );
  }

  getFullName(user: IUser) {
    return `${user.firstName} ${user.lastName}`;
  }

  getItem(items: IItem[], category: string) {
    return items.find(e => e.category === category);
  }

  getItemInfo(item: IItem) {
    return `${item?.manufacturer} - ${item?.series} ${item?.model}`
  }

  getAssignedDate(item: IItem) {
    return item.assignedDate;
  }

  onItemRemove(item: IItem) {
    this.confirmDialog.open();
    this.selectedItem = item;
  }

  onAddNewItem() {
    this.showAddInventoryItem = true;
  }

  onItemAdd() {
    this.showAddInventoryItem = false;
    // TO DO: to be implemented after having a real ENDPOINT
  }

  onConfirmRemove(remove: boolean) {
    if (!remove) {
      return;
    }
    // TO DO: to be implemented after having a real ENDPOINT
  }
}
