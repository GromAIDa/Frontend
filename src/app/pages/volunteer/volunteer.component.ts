import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ButtonType, BUTTON_TYPES_ENUM } from '@enums/button-type.enum';
import { IRegisterRequest } from '@interfaces/register.interface';
import { RoleItem } from '@interfaces/role.interface';
import { IVerifyCode } from '@interfaces/verifyCode.interface';
import { ApiService } from '@services/api/api.service';
import { ToastService } from '@services/toast/toast.service';
import { markFormGroupTouched, regex, regexErrors } from '@shared/utils';
import { catchError, map, switchMap, tap, throwError } from 'rxjs';
import { SuccessModalComponent } from './components/success-modal/success-modal.component';

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.scss'],
})
export class VolunteerComponent implements OnInit {
  emailVerify!: FormGroup;
  codeVerify!: FormGroup;

  roles: RoleItem[];

  emailRequest!: string;
  codeData!: IVerifyCode;
  infoData!: IRegisterRequest;

  volunteerForm!: FormGroup;
  regexErrors = regexErrors;
  submit: ButtonType;
  step: number = 1;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private toast: ToastService,
    private dialog: MatDialog
  ) {
    this.submit = BUTTON_TYPES_ENUM.SUBMIT;

    this.roles = [
      { label: 'Volunteer', value: 'User' },
      { label: 'Company', value: 'Volunteer' },
      { label: 'Supplier of the goods', value: 'Shop' },
    ];
  }

  ngOnInit(): void {
    this.initEmailForm();
    this.initVolunteerForm();
  }

  onVerifyMail() {
    if (this.emailVerify.valid) {
      const { value } = this.emailVerify;

      this.api
        .verifyEmail(value).subscribe(() => {
          this.step++;
        });

      this.initCodeForm();
    } else {
      markFormGroupTouched(this.emailVerify);
    }
  }

  onVerifyCode() {
    if (this.codeVerify.valid) {
      const value = this.codeVerify.value.code;
      this.codeData = {
        email: this.emailVerify.value.email,
        verificationCode: Number(value),
      };
      this.api
        .verifyCode(this.codeData)
        .pipe(tap(() => this.step++))
        .subscribe();

      this.initVolunteerForm();
    } else {
      markFormGroupTouched(this.codeVerify);
    }
  }

  onSubmit() {
    if (this.volunteerForm.valid) {
      const value = this.volunteerForm.value;
      this.infoData = {
        email: this.emailVerify.value.email,
        roles: value.role,
        firstName: value.firstName,
        lastName: value.lastName,
        phone: value.phone,
        info: value.info,
      };
      this;
      this.api
        .sendData(this.infoData)
        .pipe(
          switchMap(() =>
            this.dialog
              .open(SuccessModalComponent, {
                data: {
                  text: 'Thank you. We will contact you soon!',
                  button: {
                    text: 'Close',
                    href: '/',
                  },
                },
              })
              .afterClosed()
          ),
        )
        .subscribe();
    } else {
      markFormGroupTouched(this.volunteerForm);
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

  private initVolunteerForm(): void {
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
      role: [
        null,
        {
          updateOn: 'change',
          validators: [Validators.required],
        },
      ],
      info: [null],
    });
  }
}
