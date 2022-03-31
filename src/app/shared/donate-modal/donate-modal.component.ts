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
  isClicked: boolean = false
  paymentDataForm = new FormGroup({
    address: new FormControl({ value: environment.ADDRESS, disabled: true }),
    amount: new FormControl('300'),
  });
  errors: string[] = []
  constructor(public ethersService: EthersService, private modalService: ModalService,) { }

  ngOnInit(): void {
  }
  async startTransaction(e: Event) {
    try {
      this.isClicked = true
      await this.ethersService.transferUsdc(environment.ADDRESS, this.paymentDataForm.value.amount)
    } catch (err) {
      console.log(err);
      this.closeModal('donate-modal');

      return
    }
    this.isClicked = false
    this.closeModal('donate-modal');
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
