import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { DonateModalComponent } from './donate-modal/donate-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NgxStripeModule } from 'ngx-stripe';


@NgModule({
  declarations: [ButtonComponent, DonateModalComponent, HeaderComponent, FooterComponent],
  imports: [CommonModule, ReactiveFormsModule, 
    NgxStripeModule.forRoot('pk_test_51KlrwWCKknVOzNZdeFeDCw6Bb4HI3OZ3putDJmLe1Gg20PI09dQEMJIJuRybUfK1HME5efRoPwgJ49KlUGb5JFv200Wjd4h9yp'),
  ],
  exports: [ButtonComponent, DonateModalComponent, HeaderComponent, FooterComponent],
})
export class SharedModule {}
