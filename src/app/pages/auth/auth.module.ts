import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SharedModule } from '@shared/shared.module';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [
    AuthComponent,
    SignUpComponent
  ],
  imports: [CommonModule, AuthRoutingModule,SharedModule, MatTabsModule],
})
export class AuthModule {}
