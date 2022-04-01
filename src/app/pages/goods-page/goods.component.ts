import { Component } from '@angular/core';
import { Pagination } from 'src/app/core/types/pagination';
import { Report } from 'src/app/core/types/report';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-goods-page',
    templateUrl: './goods.component.html',
    styleUrls: ['./goods.component.scss']
})
export class GoodsPageComponent {
    goods!: Pagination<Report[]>;
    constructor(
        private apiService: ApiService,
    ) {

    }
    getGoods(page?: number | null) {
        if (page !== null) {
            this.apiService.getReports({ page }).subscribe((response) => {
                this.goods = response.data;
            });
        }
    }
}
