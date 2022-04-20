import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [InputComponent],
  imports: [CommonModule, MatIconModule],
  exports: [InputComponent],
})
export class InputModule {}
