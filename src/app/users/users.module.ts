import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UsersListComponent } from './users-list/users-list.component';
import { PipesModule } from '../pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';
import { UserItemComponent } from './user-item/user-item.component';


@NgModule({
  declarations: [
    UsersListComponent,
    UserDetailsComponent,
    UserItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
