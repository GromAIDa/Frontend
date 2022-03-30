import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { DonateModalComponent } from './donate-modal/donate-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [ButtonComponent, DonateModalComponent, HeaderComponent, FooterComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ButtonComponent, DonateModalComponent, HeaderComponent, FooterComponent],
})
export class SharedModule {}
