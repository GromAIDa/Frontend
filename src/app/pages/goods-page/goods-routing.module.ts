import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoodsPageComponent } from './goods.component';

const routes: Routes = [
  {
    path: '',
    component: GoodsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoodsPageRoutingModule {}
