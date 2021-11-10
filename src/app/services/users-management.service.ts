import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IInventoryItem } from '../models/item';
import { IUser } from '../models/user';
import { InventoryManagementService } from './inventory-management.service';

const INVENTORY_USERS_ENDPOINT = 'assets/users.json';

@Injectable({
  providedIn: 'root',
})
export class UsersManagementService {

  constructor(
    private http: HttpClient,
    private inventory: InventoryManagementService
    ) { }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(INVENTORY_USERS_ENDPOINT)
      .pipe(map((result: any) => result.users));
  }

  getUsersWithInventory(): Observable<IUser[]> {
    return combineLatest([
      this.inventory.getAllItems(),
      this.inventory.getInventoryDefinitions(),
      this.getAllUsers(),
    ]).pipe(
      map(([items, definitions, users]) => {
        users.forEach(user => {
          user.inventory = [];
          const userItems = items.filter(e => e.userId === user.id);
          userItems.forEach(item => {
            const itemDef = definitions.find((d) => d.id === item.definitionId);
            if (itemDef) {
              user.inventory?.push({
                category: itemDef.category,
                manufacturer: itemDef.manufacturer,
                series: itemDef.series,
                model: itemDef.model,
                type: itemDef.type,
                serialNumber: item.serialNumber,
                assignedDate: item.assignedDate
              });
            }
          })
        });
        return users;
      }));
  }

  getInventoryWithAssignee(): Observable<IInventoryItem[]> {
    return combineLatest([
      this.inventory.getAllItems(),
      this.getAllUsers(),
    ]).pipe(
      map(([items, users]) => {
        items.forEach(item => {
          const user = users.find(user => user.id === item.userId);
          item.assignee = user ? `${user?.firstName} ${user?.lastName}` : 'None';
        })
        return items;
      }));
  }
}
