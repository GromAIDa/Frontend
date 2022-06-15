import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyPageComponent } from './privacy-page.component';
import { PrivacyPageRoutingModule } from './privacy-page-routing.module';

import { CoreModule } from '@core/core.module';



@NgModule({
  declarations: [
    PrivacyPageComponent
  ],
  imports: [
    CommonModule,
    PrivacyPageRoutingModule,
    CoreModule
  ]
})
export class PrivacyPageModule { }
