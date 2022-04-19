import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PasswordType, PASSWORD_TYPE_ENUM } from '@enums/password-type.enum';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordComponent),
      multi: true,
    },
  ],
})
export class PasswordComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder!: string;

  @Output() changed = new EventEmitter<string>();

  value: string;
  hide:boolean = true;
  isDisabled!: boolean;
  passwordType: PasswordType;

  constructor() {
    this.value = '';
    this.passwordType = PASSWORD_TYPE_ENUM.PASSWORD;
  }

  private propagateChange: any = () => {};
  private propagateTouched: any = () => {};

  ngOnInit(): void {}

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onKeyup(value: string): void {
    this.value = value;
    this.propagateChange(value);
    this.changed.emit(value);
  }

  onBlur(): void {
    this.propagateTouched();
  }

  togglePassword(): void {
    this.passwordType =
      this.passwordType === PASSWORD_TYPE_ENUM.PASSWORD
        ? PASSWORD_TYPE_ENUM.TEXT
        : PASSWORD_TYPE_ENUM.PASSWORD;
  }
}
