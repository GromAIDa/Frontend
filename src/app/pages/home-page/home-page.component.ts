import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalService } from 'src/app/components/modal';
import { EthersService } from 'src/app/services/ethers.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  donatesSoFar: number = 100500;
  paymentDataForm = new FormGroup({
    address: new FormControl('0x5923B28c59c027b3Cd6a8E51e794BF8004d2ecc3'),
    amount: new FormControl('300'),
  });

  constructor(public ethersService: EthersService, private modalService: ModalService) {

  }

  ngOnInit(){
    // await this.ethersService.transferUsdc('0x5923B28c59c027b3Cd6a8E51e794BF8004d2ecc3', '300')
  }

  async startTransaction(){
    await this.ethersService.transferUsdc(this.paymentDataForm.value.address, this.paymentDataForm.value.amount)
  }

  openModal(id: string) {
    console.log('open: ', id);
    
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
