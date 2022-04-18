import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EffectFade } from 'swiper';
import SwiperCore, { Navigation } from 'swiper';

import { BurgerToggleService } from '@services/burger-toggle.service';
import { ModalService } from '@shared/modal';
import { TotalDonations } from '@interfaces/totalDonations';
import { ImgService } from '@services/img.service';
import { Pagination } from '@interfaces/pagination';
import { Report } from '@interfaces/report';
import { ApiService } from '@services/api/api.service';

SwiperCore.use([EffectFade, Navigation]);

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NewsPageComponent implements OnInit {
  currentReport!: Report;
  reports!: Pagination<Report[]>;
  totalDontions!: TotalDonations;
  firstMainReports!: Report[];
  secondMainReports!: Report[];
  currentTimePeriod: string = 'all';

  constructor(
    private apiServise: ApiService,
    public imgService: ImgService,
    public modalService: ModalService,
    public burgerService: BurgerToggleService
  ) {}

  ngOnInit(): void {
    this.getReprots();
    this.apiServise.getTotalDontions().subscribe((response) => {
      this.totalDontions = response.data;
    });
  }

  selectDonat(report: Report) {
    this.currentReport = report;
    document
      .getElementById('scroll-position')
      ?.scrollIntoView({ behavior: 'smooth' });
  }

  getTimeLeft(year: string) {
    return Math.ceil(
      (Number(new Date()) - Number(new Date(year))) / 1000 / 60 / 60 / 24
    );
  }

  getReprots(page?: number | null) {
    if (page !== null) {
      this.apiServise
        .getReports({ page, time: this.currentTimePeriod })
        .subscribe((response) => {
          if (response.data.docs.length) {
            this.reports = response.data;
            this.currentReport = response.data.docs[0];
            this.firstMainReports = this.reports.docs.slice(
              0,
              this.reports.docs.length / 2
            );
            this.secondMainReports = this.reports.docs.slice(
              this.reports.docs.length / 2,
              this.reports.docs.length
            );
          } else {
            this.reports = response.data;
          }
        });
    }
  }
  setCurrentTimePeriod(period: string) {
    this.currentTimePeriod = period;
    this.getReprots(1);
  }
  fakeArray(number: number) {
    return Array.from(Array(number).keys());
  }
}
