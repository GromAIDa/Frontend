import { Component, Input } from '@angular/core';
import { ButtonType, BUTTON_TYPES_ENUM } from '@enums/button-type.enum';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() type: ButtonType;
  @Input() class: string;

  constructor() {
    this.class = 'app-button';
    this.type = BUTTON_TYPES_ENUM.BUTTON;
  }
}
