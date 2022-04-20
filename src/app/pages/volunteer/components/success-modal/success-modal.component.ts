import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface IButtonConfig {
  text: string;
  href: string;
}

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.scss'],
})
export class SuccessModalComponent {
  title: string = 'Good job!';
  text: string | null;
  button: IButtonConfig | null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<SuccessModalComponent>
  ) {
    this.text = data.text;
    this.button = data.button;
  }

  close(): void {
    this.ref.close();
  }
}
