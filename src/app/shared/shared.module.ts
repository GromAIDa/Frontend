import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonateModalComponent } from './donate-modal/donate-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CookiesModalComponent } from './cookies-modal/cookies-modal.component';
import { PaymentSuccessModalComponent } from './payment-success-modal/payment-success-modal.component';
import { PaymentCancelModalComponent } from './payment-cancel-modal/payment-cancel-modal.component';
import { RouterModule } from '@angular/router';
import { ButtonModule } from './button/button.module';
import { ControlsModule } from './controls/controls.module';
import { BlogModalComponent } from './blog-modal/blog-modal.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    DonateModalComponent,

    CookiesModalComponent,
    PaymentSuccessModalComponent,
    PaymentCancelModalComponent,
    BlogModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    RouterModule,
    SwiperModule,
    ButtonModule,
    ControlsModule
  ],
  exports: [
    ButtonModule,
    ControlsModule,

    DonateModalComponent,
    BlogModalComponent,
    CookiesModalComponent,
    PaymentSuccessModalComponent,
    PaymentCancelModalComponent,
  ],
})
export class SharedModule {}
