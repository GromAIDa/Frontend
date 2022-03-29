import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { get } from 'https';
import { ModalService } from 'src/app/components/modal';
import { ApiService } from 'src/app/services/api.service';
import { EthersService } from 'src/app/services/ethers.service';
import SwiperCore, { EffectFade, Navigation } from 'swiper';

SwiperCore.use([EffectFade, Navigation]);

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent implements OnInit {
  donatesSoFar: number = 0;
  donatorsNumber:number = 0;
  timeLeft: number = 0;
  paymentDataForm = new FormGroup({
    address: new FormControl('0x5923B28c59c027b3Cd6a8E51e794BF8004d2ecc3'),
    amount: new FormControl('300'),
  });

  constructor(public ethersService: EthersService, private modalService: ModalService, private apiService: ApiService) {

  }

  ngOnInit(){
    this.apiService.getTotal().subscribe(response => {
      console.log(response);
      this.donatesSoFar = response.donated;
      this.donatorsNumber = response.donators;
      this.timeLeft = this.getDays(response.start)
    })
  }

  getDays(start:string):number{
    let startDate = new Date(start).getTime()
    let end = new Date().getTime()
    
    let difference = startDate - end
    let days = Math. ceil(difference / (1000 * 3600 * 24));
    return days
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
