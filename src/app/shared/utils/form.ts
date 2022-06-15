import { FormGroup } from '@angular/forms';

export const markFormGroupTouched = (form: FormGroup) => {
  Object.values(form.controls).forEach((control) => {
    control.markAsTouched();

    if ((control as any).controls) {
      markFormGroupTouched(control as FormGroup);
    }
  });
};
