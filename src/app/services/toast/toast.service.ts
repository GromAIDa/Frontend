import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private snackbar: MatSnackBar) {}

  info(message: string, buttonText: string) {
    this.snackbar.open(message, buttonText, {
      panelClass: `toast-info`,
    });
  }

  error(message: string, buttonText: string) {
    this.snackbar.open(message, buttonText, {
      panelClass: `toast-error`,
    });
  }

  success(message: string, buttonText: string) {
    this.snackbar.open(message, buttonText, {
      panelClass: `toast-success`,
    });
  }
}
