import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EffectFade } from 'swiper';
import SwiperCore, { Navigation } from "swiper";
import { ApiService } from 'src/app/services/api.service';
import { Report } from 'src/app/types/report';
import { Pagination } from 'src/app/types/pagination';
import { ImgService } from 'src/app/services/img.service';
import { TotalDonations } from 'src/app/types/totalDonations';

SwiperCore.use([EffectFade, Navigation]);

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss', '../home-page/home-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewsPageComponent implements OnInit {

  currentReport!: Report;
  reports!: Pagination<Report[]>;
  totalDontions!: TotalDonations;
  firstMainReports!: Report[];
  secondMainReports!: Report[];

  

  constructor(private apiServise: ApiService, public imgService: ImgService) {}

  ngOnInit(): void {
    this.apiServise.getReports().subscribe((response) => {
      this.reports = response.data;
      this.currentReport = response.data.docs[0];
      this.firstMainReports = this.reports.docs.slice(0, this.reports.docs.length/2);
      this.secondMainReports = this.reports.docs.slice(this.reports.docs.length/2, this.reports.docs.length);
    });
    this.apiServise.getTotalDontions().subscribe((response) => {
      this.totalDontions = response.data;
    })
  }

  selectDonat(report: Report) {
    this.currentReport = report;
    document.getElementById('scroll-position')?.scrollIntoView({behavior: "smooth"})
  }

  getTimeLeft(year: string) {
    return Math.ceil((Number(new Date()) - Number(new Date(year)))/1000/60/60/24)
  }
}
