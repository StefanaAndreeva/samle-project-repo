import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IUser } from "../models/user";


@Injectable({
  providedIn: 'root',
})
export class StoreService {

  private _currentUser$ = new BehaviorSubject<IUser | null>(null);
  private _users$ = new BehaviorSubject<IUser[] | null>(null);

  public get users$() {
    return this._users$;
  }

  public get users() {
    return this.users$.value;
  }

  public setUsers(value: IUser[]) {
    this._users$.next(value);
  }

  public get currentUser$() {
    return this._currentUser$;
  }

  public get currentUser() {
    return this.currentUser$.value;
  }

  public setCurrentUser(value: IUser) {
    this._currentUser$.next(value);
  }


}
