import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalService } from 'src/app/shared/modal';
import { ApiService } from 'src/app/services/api.service';
import { EthersService } from 'src/app/services/ethers.service';
import { TotalDonations } from 'src/app/core/types/totalDonations';
import SwiperCore, { EffectFade, Navigation } from 'swiper';
import { BurgerToggleService } from 'src/app/services/burger-toggle.service';

SwiperCore.use([EffectFade, Navigation]);

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent implements OnInit {


  defaultArray: any[] = new Array(8);

  totalDontions: TotalDonations = {
    donated: 0,
    donators: 0,
    start: new Date().toDateString()
  };
  constructor(public ethersService: EthersService,
    public modalService: ModalService,
    private apiService: ApiService,
    public burgerService: BurgerToggleService
    ) {

  }

  ngOnInit() {
    this.apiService.getTotalDontions().subscribe(response => {
      this.totalDontions = response.data;
    })
  }

  getTimeLeft(year: string) {
    return Math.ceil((Number(new Date()) - Number(new Date(year))) / 1000 / 60 / 60 / 24)
  }
}
