import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryViewComponent } from './inventory-view/inventory-view.component';
import { SharedModule } from '../shared/shared.module';
import { InventoryDetailsComponent } from './inventory-details/inventory-details.component';
import { InventoryViewStateService } from './inverntory-view-state.service';

@NgModule({
  declarations: [
    InventoryViewComponent,
    InventoryDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InventoryRoutingModule
  ],
  providers: [InventoryViewStateService],
})
export class InventoryModule { }
