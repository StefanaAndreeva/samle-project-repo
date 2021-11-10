import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users$!: Observable<IUser[]>;
  searchValue!: string;

  constructor(
    private route: ActivatedRoute,
  ) { }

  mapFn = (user: IUser) => this.fullName(user);

  ngOnInit() {
    this.users$ = this.route.data.pipe(map((data: any) => data.users));
  }

  fullName(user: IUser) {
    return `${user.firstName} ${user.lastName}`;
  }

  trackById(index: number, user: IUser) {
    return user.id;
  }
}
