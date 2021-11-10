import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IInventoryItemDef } from '../models/definition';
import { IInventoryItem } from '../models/item';

const INVENTORY_DATA_ENDPOINT = 'assets/data.json';
const INVENTORY_DEF_ENDPOINT = 'assets/definitions.json';

export interface IGroupedDefinitions {
  category: string;
  categoryItems: IInventoryItemDef[];
}

@Injectable({
  providedIn: 'root',
})
export class InventoryManagementService {

  constructor(
    private http: HttpClient
    ) { }

  getAllItems(): Observable<IInventoryItem[]> {
    return this.http.get<IInventoryItem[]>(INVENTORY_DATA_ENDPOINT)
      .pipe(map((result: any) => result.items));
  }

  getInventoryDefinitions(): Observable<IInventoryItemDef[]> {
    return this.http.get<IInventoryItemDef[]>(INVENTORY_DEF_ENDPOINT)
      .pipe(map((result: any) => result.definitions));
  }

  getDefinitionsByCategory(): Observable<IGroupedDefinitions[]> {
    return combineLatest([
      this.getAllItems(),
      this.getInventoryDefinitions(),
    ]).pipe(
      map(([items, definitions]) => {
        let groups: IGroupedDefinitions[] = [];
        const uniqueCategories = this.getUniqueCategories(definitions);
        uniqueCategories.forEach(categoryName => {
          const catItems = definitions.filter(d => d.category === categoryName);
          catItems.forEach(catItem => {
            const all = items.filter(itm => itm.definitionId === catItem.id);
            const free = all.filter(itm => itm.userId === null);
            catItem.count = all.length;
            catItem.free = free.length;
          });
          groups.push({
            category: categoryName,
            categoryItems: catItems
          });
        });
        return groups;
      })
    )
  }

  getUniqueCategories(definitions: IInventoryItemDef[]) {
    const uniqueCategories = new Set<string>();
    definitions.forEach(d => uniqueCategories.add(d.category));
    return uniqueCategories;
  }
}
