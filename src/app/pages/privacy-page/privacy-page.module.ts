import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyPageComponent } from './privacy-page.component';
import { PrivacyPageRoutingModule } from './privacy-page-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    PrivacyPageComponent
  ],
  imports: [
    CommonModule,
    PrivacyPageRoutingModule,
    SharedModule
  ]
})
export class PrivacyPageModule { }
