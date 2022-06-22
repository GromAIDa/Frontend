import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import SwiperCore, { EffectFade, Navigation } from 'swiper';
import { BurgerToggleService } from '@services/burger-toggle.service';
import { TotalDonations } from '@interfaces/totalDonations';
import { ApiService } from '@services/api/api.service';
import { EthersService } from '@services/ethers/ethers.service';
import { ModalService } from '@shared/modal';


SwiperCore.use([EffectFade, Navigation]);

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent implements OnInit {
  defaultArray: any[] = new Array(8);
  totalDonations: TotalDonations = {
    donated: 0,
    donators: 0,
    start: new Date().toDateString()
  };
  payment_status!: boolean

  constructor(public ethersService: EthersService,
    public modalService: ModalService,
    private apiService: ApiService,
    public burgerService: BurgerToggleService,
  ) {
    
  }

  ngOnInit() {
    this.apiService.getTotalDonations().subscribe(response => {
      this.totalDonations = response.data;
    })
  }

  getTimeLeft(year: string) {
    return Math.ceil((Number(new Date()) - Number(new Date(year))) / 1000 / 60 / 60 / 24)
  }

  toReadMore() {
    document.getElementById('scroll-to')?.scrollIntoView({block: "center", behavior: "smooth"});
  }
}
