import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IUser } from "../models/user";

@Injectable()
export class InventoryViewStateService {

  private _selectedUser$ = new BehaviorSubject<IUser | null>(null);

  get selectedUser$() {
    return this._selectedUser$;
  }

  get selectedUser() {
    return this._selectedUser$.value;
  }

  setSelectedUser(value: IUser | null) {
    this._selectedUser$.next(value);
  }
}
