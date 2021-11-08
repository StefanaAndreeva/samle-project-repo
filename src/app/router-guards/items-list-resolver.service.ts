import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { IInventoryItemDef } from '../models/inventory';
import { InventoryManagementService } from '../services/inventory-management.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsListResolverService implements Resolve<IInventoryItemDef[]> {

  constructor(
    private inventoryService: InventoryManagementService,
    ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IInventoryItemDef[]> | Observable<never> {
    return this.inventoryService.getCategoriesItems().pipe(
      take(1),
      mergeMap(items => items ? of(items) : EMPTY)
    );
  }
}
