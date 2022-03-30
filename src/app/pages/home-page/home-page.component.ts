import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { get } from 'https';
import { ModalService } from 'src/app/components/modal';
import { ApiService } from 'src/app/services/api.service';
import { EthersService } from 'src/app/services/ethers.service';
import { TotalDonations } from 'src/app/types/totalDonations';
import { environment } from 'src/environments/environment';
import SwiperCore, { EffectFade, Navigation } from 'swiper';

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
  constructor(public ethersService: EthersService, public modalService: ModalService, private apiService: ApiService) {
    
  }

  ngOnInit(){
    this.apiService.getTotalDontions().subscribe(response => {
      this.totalDontions = response.data;
    })
  }

  getTimeLeft(year: string) {
    return Math.ceil((Number(new Date()) - Number(new Date(year)))/1000/60/60/24)
  }
}
