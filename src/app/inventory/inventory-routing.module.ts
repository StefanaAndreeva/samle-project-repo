import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../router-guards/authentication.guard';
import { UsersResolverService } from '../router-guards/users-list-resolver.service';
import { InventoryViewComponent } from './inventory-view/inventory-view.component';

const routes: Routes = [
  {
    path: '',
    component: InventoryViewComponent,
    resolve: {
      users: UsersResolverService
    },
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
