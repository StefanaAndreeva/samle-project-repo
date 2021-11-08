import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, EMPTY, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { IInventoryItemDef } from '../models/inventory';
import { IItem } from '../models/item';
import { IUser } from '../models/user';
import { UsersManagementService } from './users-management.service';

const INVENTORY_DATA_ENDPOINT = 'assets/data.json';
const INVENTORY_DEF_ENDPOINT = 'assets/inventory-definitions.json';

@Injectable({
  providedIn: 'root',
})
export class InventoryManagementService {

  constructor(
    private http: HttpClient,
    private usersService: UsersManagementService,
    ) { }

  getAllItems(): Observable<IItem[]> {
    return this.http.get<IItem[]>(INVENTORY_DATA_ENDPOINT)
      .pipe(map((result: any) => result.items));
  }

  getInventoryDefinitions(): Observable<IInventoryItemDef[]> {
    return this.http.get<IInventoryItemDef[]>(INVENTORY_DEF_ENDPOINT)
      .pipe(map((result: any) => result.inventory));
  }

  getUsersWithInventory(): Observable<IUser[]> {
    return combineLatest([
      this.getAllItems(),
      this.getInventoryDefinitions(),
      this.usersService.getAllUsers(),
    ]).pipe(
      map(([items, definitions, users]) => {
        users.forEach(user => {
          user.inventory = items.filter(e => e.assignedTo === user.name);
          user.inventory.forEach(item => {
            const category = definitions.find(d => d.category === item.category);
            item.details = category?.items.find(catItem => catItem.id === item.model);
          });
        });
       return users;
      }),
      mergeMap(users => users ? of(users) : EMPTY));
  }

  getCategoriesItems(): Observable<IInventoryItemDef[]> {
    return combineLatest([
      this.getAllItems(),
      this.getInventoryDefinitions()
    ]).pipe(
      map(([items, definitions]) => {
        definitions.forEach(def => {
          def.items.forEach(defItem => {
            const allInstances = items.filter(itm => itm.category === def.category && itm.model === defItem.id);
            const freeInstances = allInstances.filter(inst => inst.assignedTo === '');
            defItem.count = allInstances.length;
            defItem.free = freeInstances.length;
          });
        });
        return definitions;
      }),
      mergeMap(definitions => definitions ? of(definitions) : EMPTY))
  }
}
