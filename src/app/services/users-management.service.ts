import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '../models/user';

const INVENTORY_USERS_ENDPOINT = 'assets/users.json';

@Injectable({
  providedIn: 'root',
})
export class UsersManagementService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(INVENTORY_USERS_ENDPOINT)
      .pipe(map((result: any) => result.users));
  }
}
