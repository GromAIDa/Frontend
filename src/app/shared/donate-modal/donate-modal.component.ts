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
    address: new FormControl(environment.ADDRESS),
    amount: new FormControl('300'),
  });
  constructor(public ethersService: EthersService, private modalService: ModalService,) { }

  ngOnInit(): void {
  }
  async startTransaction(){
    await this.ethersService.transferUsdc(this.paymentDataForm.value.address, this.paymentDataForm.value.amount)
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
