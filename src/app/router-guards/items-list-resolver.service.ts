import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { IGroupedDefinitions, InventoryManagementService } from '../services/inventory-management.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsListResolverService implements Resolve<IGroupedDefinitions[]> {

  constructor(
    private inventoryService: InventoryManagementService,
    ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IGroupedDefinitions[]> | Observable<never> {
    return this.inventoryService.getDefinitionsByCategory().pipe(
      take(1),
      mergeMap(definitions => definitions ? of(definitions) : EMPTY)
    );
  }
}
