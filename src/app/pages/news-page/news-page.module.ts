import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsPageComponent } from './news-page.component';
import { NewsPageRoutingModule } from './news-page-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { SwiperModule } from 'swiper/angular';
import { ModalModule } from '../../shared/modal';

@NgModule({
  declarations: [NewsPageComponent],
  imports: [
    CommonModule,
    NewsPageRoutingModule,
    SharedModule,
    SwiperModule,
    ModalModule,
  ],
})
export class NewsPageModule {}
