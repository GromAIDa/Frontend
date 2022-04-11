import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { DonateModalComponent } from './donate-modal/donate-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CookiesModalComponent } from './cookies-modal/cookies-modal.component';


@NgModule({
  declarations: [ButtonComponent, DonateModalComponent, HeaderComponent, FooterComponent, CookiesModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CurrencyMaskModule
  ],
  exports: [ButtonComponent, DonateModalComponent, HeaderComponent, FooterComponent, CookiesModalComponent],
})
export class SharedModule { }
