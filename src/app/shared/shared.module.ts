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

@NgModule({
  declarations: [
    DonateModalComponent,

    CookiesModalComponent,
    PaymentSuccessModalComponent,
    PaymentCancelModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    RouterModule,
    ButtonModule
  ],
  exports: [
    ButtonModule,

    DonateModalComponent,

    CookiesModalComponent,
    PaymentSuccessModalComponent,
    PaymentCancelModalComponent,
  ],
})
export class SharedModule {}
