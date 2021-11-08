import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../router-guards/authentication.guard';
import { ItemsListResolverService } from '../router-guards/items-list-resolver.service';
import { ItemsListComponent } from './items-list/items-list.component';

const routes: Routes = [
  {
    path: 'items',
    component: ItemsListComponent,
    resolve: {
      items: ItemsListResolverService
    },
    canActivate: [AuthenticationGuard]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }
