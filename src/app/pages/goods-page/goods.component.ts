import { Component, OnInit } from '@angular/core';
import { GoodsItem } from '@interfaces/goodsItem';
import { Pagination } from '@interfaces/pagination';
import { ApiService } from '@services/api/api.service';

import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
    selector: 'app-goods-page',
    templateUrl: './goods.component.html',
    styleUrls: ['./goods.component.scss']
})
export class GoodsPageComponent implements OnInit {
    goods!: Pagination<GoodsItem[]>;
    goodsTypes!: string[];
    currentType!: string;
    public searchTerm!: string;
    public searchTermChanged: Subject<string> = new Subject<string>();
    private searchTermChangedSubscription!: Subscription;

    noPhotoUrl = 'https://accommodation.tripura.gov.in/Images2/LodgeImage/NoImageAvailable.png'
    constructor(
        private apiService: ApiService,
    ) {

    }

    ngOnInit(): void {
        this.getGoodsTypes();
        this.getGoods();
        this.searchTermChangedSubscription = this.searchTermChanged
            .pipe(
                debounceTime(800),
                distinctUntilChanged()
            )
            .subscribe(newText => {
                this.searchTerm = newText;
                this.getGoods(1, this.searchTerm, this.currentType)

            });

    }

    getGoods(page?: number | null, query?: string, type?: string): void {
        if (page !== null) {
            this.apiService.getGoods({ page }, { query: this.searchTerm, type: this.currentType }).subscribe((response) => {
                this.goods = response.data;
                window.scroll({ 
                    top: 0, 
                    left: 0, 
                    behavior: 'smooth' 
             });
            });
        }
    }

    getGoodsTypes(): void {
        this.apiService.getGoodsTypes().subscribe((response) => {
            this.goodsTypes = response.data;
            this.setCurrentType(this.goodsTypes[0])
        })
    }

    setCurrentType(type: string): void {
        this.currentType = type
        this.searchTerm = ''
        this.getGoods(1, this.searchTerm, this.currentType)
    }

    ngOnDestroy() {
        this.searchTermChangedSubscription.unsubscribe();
    }
    
}
