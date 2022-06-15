import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputModule } from './input/input.module';
import { FormFieldModule } from './form-field/form-field.module';
import { PasswordModule } from './password/password.module';
import { RadiosModule } from './radios/radios.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputModule,
    FormFieldModule,
    PasswordModule,
    RadiosModule,
  ],
  exports: [InputModule, FormFieldModule, PasswordModule, RadiosModule],
})
export class ControlsModule {}
