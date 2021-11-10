import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { IUser } from '../models/user';
import { UsersManagementService } from '../services/users-management.service';

@Injectable({
  providedIn: 'root'
})
export class UsersResolverService implements Resolve<IUser[]> {

  constructor(
    private usersService: UsersManagementService
    ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUser[]> | Observable<never> {
    return this.usersService.getUsersWithInventory().pipe(
      take(1),
      mergeMap(users => users ? of(users) : EMPTY)
    );
  }
}
