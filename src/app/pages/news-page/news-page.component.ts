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
import { Post } from '@interfaces/post';

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
  totalDonations!: TotalDonations;
  firstMainReports!: Report[];
  secondMainReports!: Report[];
  posts!: Pagination<Post[]>;
  currentTimePeriod: string = 'all';
  chosenPost!: Post;

  constructor(
    private apiService: ApiService,
    public imgService: ImgService,
    public modalService: ModalService,
    public burgerService: BurgerToggleService
  ) {}

  ngOnInit(): void {
    this.getReports();
    this.apiService.getTotalDonations().subscribe((response) => {
      this.totalDonations = response.data;
    });
    this.apiService.getPosts({limit: 8}).subscribe((response) => {
      this.posts = response.data;
    });
  }

  toReadMore() {
    document.getElementById('scroll-position')?.scrollIntoView({block: "center", behavior: "smooth"});
  }

  selectDonate(report: Report) {
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

  getDate(date: string) {
    let array = new Date(date).toDateString().split(' ')
    array.shift();
    return array.join(' ')
  }

  getReports(page?: number | null) {
    if (page !== null) {
      this.apiService
        .getReports({ page, time: this.currentTimePeriod, limit: 8 })
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

  getPosts(page?: number | null) {
    if (page !== null) {
      this.apiService
        .getPosts({ page, time: this.currentTimePeriod, limit: 8 })
        .subscribe((response) => {
            if (response.data.docs.length) {
              this.posts = response.data;
            }
        });
    }
  }

  setCurrentTimePeriod(period: string) {
    this.currentTimePeriod = period;
    this.getReports(1);
  }

  fakeArray(number: number) {
    return Array.from(Array(number).keys());
  }

  openPost(post: Post) {
    const idsOfPostsThatHaveBeenSeen: string[] = JSON.parse(localStorage.getItem('idsOfPostsThatHaveBeenSeen') || '[]');
    if (!idsOfPostsThatHaveBeenSeen.includes(post._id)) {
      idsOfPostsThatHaveBeenSeen.push(post._id)
      localStorage.setItem('idsOfPostsThatHaveBeenSeen', JSON.stringify(idsOfPostsThatHaveBeenSeen));
      this.apiService.postView(post._id).subscribe(()=>{});
    }
    this.chosenPost = post;
    this.modalService.open('blog-modal')
  }
}
