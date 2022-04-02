import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { GoodsPageComponent } from './goods.component';
import { GoodsPageRoutingModule } from './goods-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [GoodsPageComponent],
  imports: [
    CommonModule,
    GoodsPageRoutingModule,
    SharedModule,
    FormsModule
  ],
})
export class GoodsPageModule {}