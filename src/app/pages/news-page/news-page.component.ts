import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EffectFade, SwiperOptions } from 'swiper';

import SwiperCore, { EffectFlip, Pagination, Navigation } from "swiper";
import { donates } from './mockData';
import { ApiService } from 'src/app/services/api.service';
import { report } from 'process';
import { environment } from 'src/environments/environment';

SwiperCore.use([EffectFade, Navigation]);

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss', '../home-page/home-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewsPageComponent implements OnInit {
  mockData: any
  currentDonat: any
  reports: any;
  environment: string = environment.API_URL

  constructor(private apiServise: ApiService) {
    this.mockData = donates;
    this.currentDonat = this.mockData[0]
    apiServise.getReports().subscribe((data: {data:{
      docs: [{
        products: [{
          price: number,
        }],
        donated?: number
      }]
    }
      
    }) => {
      let formattedProducts = data.data.docs.map(donat => {
        let donated = 0;
        donat.products.map(product =>{
          donated += product.price
        })
        return {
          ...donat,
          donated
        }
      })

      this.reports = formattedProducts
      console.log(this.reports);
      

    });
  }

  ngOnInit(): void {
  }


  onSlideChange() {
    console.log('slide change');
  }

  selectDonat(donat: any) {
    console.log(donat);

    this.currentDonat = donat
  }

}
