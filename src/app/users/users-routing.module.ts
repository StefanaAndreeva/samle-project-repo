import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../router-guards/authentication.guard';
import { UsersResolverService } from '../router-guards/users-list-resolver.service';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UsersListComponent } from './users-list/users-list.component';


const routes: Routes = [
  {
    path: 'users',
    component: UsersListComponent,
    resolve: {
      users: UsersResolverService
    },
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: ':id',
        component: UserDetailsComponent,
        canActivate: [AuthenticationGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
