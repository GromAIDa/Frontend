import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonType, BUTTON_TYPES_ENUM } from '@enums/button-type.enum';
import { markFormGroupTouched, regex, regexErrors } from '@shared/utils';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  loginForm!: FormGroup;
  submit: ButtonType;
  checked = false;
  regexErrors = regexErrors;
  constructor(private fb: FormBuilder) {
    this.submit = BUTTON_TYPES_ENUM.SUBMIT;
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      email: [
        null,
        {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.maxLength(128),
            Validators.pattern(regex.email),
          ],
        },
      ],
      password: [
        null,
        {
          updateOn: 'change',
          validators: [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
            Validators.pattern(regex.password),
          ],
        },
      ],
      rememberMe: [
        false,
        {
          updateOn: 'change',
        },
      ],
    });
  }

  public onSubmit(): void {
    if (this.loginForm.valid) {
      const value = this.loginForm.value;
      console.log(11, value);
    } else {
      markFormGroupTouched(this.loginForm);
    }
  }
}
