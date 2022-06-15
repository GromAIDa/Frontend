import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { SwiperModule } from 'swiper/angular';
import { ModalModule } from '../../shared/modal';
import { HomePageComponent } from './home-page.component';
import { HomePageRoutingModule } from './home-page-routing.module';
import { CoreModule } from '@core/core.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    CoreModule,
    SharedModule,
    SwiperModule,
    ModalModule,
  ],
})
export class HomePageModule {}