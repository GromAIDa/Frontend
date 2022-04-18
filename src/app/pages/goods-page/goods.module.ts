import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { GoodsPageComponent } from './goods.component';
import { GoodsPageRoutingModule } from './goods-routing.module';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '@core/core.module';

@NgModule({
  declarations: [GoodsPageComponent],
  imports: [
    CommonModule,
    GoodsPageRoutingModule,
    SharedModule,
    FormsModule,
    CoreModule
  ],
})
export class GoodsPageModule {}