import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '@services/api/api.service';
import { EthersService } from '@services/ethers/ethers.service';

import { environment } from 'environments/environment';

import { ModalService } from '../modal';

interface Error {
  message: string;
}
@Component({
  selector: 'app-donate-modal',
  templateUrl: './donate-modal.component.html',
  styleUrls: ['./donate-modal.component.scss'],
})
export class DonateModalComponent {
  isClicked: boolean = false;
  methods = new FormGroup({
    method: new FormControl('card'),
  });
  paymentDataForm = new FormGroup({
    address: new FormControl({ value: environment.ADDRESS, disabled: true }),
    amount: new FormControl(0),
  });
  error!: string;
  constructor(
    public ethersService: EthersService,
    private modalService: ModalService,
    private api: ApiService
  ) {}

  async startTransaction(e: Event) {
    try {
      this.isClicked = true;
      await this.ethersService.transferUsdc(
        environment.ADDRESS,
        `${this.paymentDataForm.value.amount}`
      );
    } catch (err) {
      const error = err as Error;
      this.error = error.message;

      return;
    }
    this.isClicked = false;
    this.closeModal('donate-modal');
  }

  async createPayment() {
    this.isClicked = true;
    if (this.paymentDataForm.value.amount < 1) {
      this.error = 'Amount should be equal or greater than 1';
      this.isClicked = false;
      return;
    }
    this.error = '';
    this.api
      .createPaymentLink({
        currency: environment.CURRENCY,
        description: 'Donate',
        amount: this.paymentDataForm.value.amount,
        success_url:
          environment.SUCCESS_URL +
          `&amount=${this.paymentDataForm.value.amount}`,
        cancel_url: environment.CANCEL_URL,
      })
      .subscribe((value) => {
        window.open(value.url, '_self');
        this.isClicked = false;
      });
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
