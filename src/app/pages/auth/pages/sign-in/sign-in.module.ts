import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    SignInRoutingModule,

    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatCheckboxModule,
  ],
})
export class SignInModule {}
