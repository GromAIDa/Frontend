import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonType, BUTTON_TYPES_ENUM } from '@enums/button-type.enum';
import { markFormGroupTouched, regex, regexErrors } from '@shared/utils';

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.scss'],
})
export class VolunteerComponent implements OnInit {
  emailVerify!: FormGroup;
  codeVerify!: FormGroup;

  volunteerForm!: FormGroup;
  regexErrors = regexErrors;
  submit: ButtonType;
  step: number = 2;

  constructor(private fb: FormBuilder) {
    this.submit = BUTTON_TYPES_ENUM.SUBMIT;
  }

  ngOnInit(): void {
    this.initEmailForm();

   
  }

  onVerifyMail() {
    if (this.emailVerify.valid) {
      this.step++;
      const value = this.emailVerify.value;
      this.initCodeForm();
      // Here send code
      console.log(123, value);
    } else {
      markFormGroupTouched(this.emailVerify);
    }
  }
  onVerifyCode() {
    if (this.codeVerify.valid) {
      this.step++;
      const value = this.codeVerify.value;
      // Here send code
      console.log(123, value);
    } else {
      markFormGroupTouched(this.codeVerify);
    }
  }

  previous() {
    this.step--;
  }

  private initEmailForm(): void {
    this.emailVerify = this.fb.group({
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
    });
  }
  private initCodeForm(): void {
    this.codeVerify = this.fb.group({
      code: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required, Validators.pattern(regex.numbers)],
        },
      ],
    });
  }

  private initVolunteerForm():void {
    this.volunteerForm = this.fb.group({
      firstName: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required, Validators.maxLength(128)],
        },
      ],
      lastName: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required, Validators.maxLength(128)],
        },
      ],
      phone: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required, Validators.maxLength(128)],
        },
      ],
    })
  }
}
