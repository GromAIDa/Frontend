import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EthersService } from 'src/app/services/ethers.service';
import { environment } from 'src/environments/environment';
import { ModalService } from '../modal';

@Component({
  selector: 'app-donate-modal',
  templateUrl: './donate-modal.component.html',
  styleUrls: ['./donate-modal.component.scss']
})
export class DonateModalComponent implements OnInit {
  paymentDataForm = new FormGroup({
    address: new FormControl({ value: environment.ADDRESS, disabled: true }),
    amount: new FormControl('300'),
  });
  errors: string[] = []
  constructor(public ethersService: EthersService, private modalService: ModalService,) { }

  ngOnInit(): void {
  }
  async startTransaction() {
    try {
      await this.ethersService.transferUsdc(this.paymentDataForm.value.address, this.paymentDataForm.value.amount)
    } catch ({message}) {
      if(message === environment.METAMASK_ERRORS.notInstalled){
          this.errors.push(message)
      }
    }
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
