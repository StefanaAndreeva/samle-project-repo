import { HttpResponse } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { of, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { IUser } from "../models/user";
import { StoreService } from "./store.service";
import { UsersManagementService } from "./users-management.service";

const FAKE_PASSWORD = 'abc123';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnDestroy{

  allowedUsers!: IUser[];

  private _destroy$ = new Subject<boolean>();

  constructor(
    private users: UsersManagementService,
    private store: StoreService,
  ) {
    this.users.getAllUsers()
      .pipe(takeUntil(this._destroy$))
      .subscribe(users => this.allowedUsers = users);
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  login(username: string, password: string) {
    const currentUser = this.allowedUsers.find(u => u.email === username);
    if (currentUser && password == FAKE_PASSWORD) {
      this.store.setCurrentUser(currentUser);
      localStorage.setItem("token", "my-super-secret-token-from-server");
      return of(new HttpResponse({ status: 200 }));
    } else {
      return of(new HttpResponse({ status: 401 }));
    }
  }

  logout() {
    localStorage.removeItem("token");
  }

  isUserLoggedIn() {
    if (localStorage.getItem("token") != null) {
      return true;
    }
    return false;
  }
}
