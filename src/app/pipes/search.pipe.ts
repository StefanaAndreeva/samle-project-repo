import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '../models/user';

type FilterItemsType =  IUser | string;

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform<T extends FilterItemsType>(items: Array<T>, searchText: string, mapFn: (item: T) => string): Array<T> {
    if (items && searchText) {
      const result: any[] = [];
      items.forEach(item => {
        const searchItm = mapFn(item);
        if (searchItm.toLowerCase().includes(searchText.toLowerCase())) {
          result.push(item);
        }
      });
      return result;
    }
    return items;
  }
}
