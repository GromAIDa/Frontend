import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoodsItem } from '@interfaces/goodsItem';
import { Pagination } from '@interfaces/pagination';
import { PaginationsRequest } from '@interfaces/paginations.request';
import { Report } from '@interfaces/report';
import { Response } from '@interfaces/response';
import { SearchRequest } from '@interfaces/searchRequest';
import { TotalDonations } from '@interfaces/totalDonations';
import { PaymentRequest } from '@interfaces/paymentRequest';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  apiUrl = environment.API_URL;

  public getReports(
    req: PaginationsRequest
  ): Observable<Response<Pagination<Report[]>>> {
    return this.httpClient.get<Response<Pagination<Report[]>>>(
      `${this.apiUrl}/report?page=${req.page || 1}&limit=${
        req.limit || 10
      }&time=${req.time}`
    );
  }

  public getTotalDontions(): Observable<Response<TotalDonations>> {
    return this.httpClient.get<Response<TotalDonations>>(
      `${this.apiUrl}/total`
    );
  }

  public getGoodsTypes(): Observable<Response<string[]>> {
    return this.httpClient.get<Response<string[]>>(
      `${this.apiUrl}/products/type`
    );
  }

  public getGoods(
    req: PaginationsRequest,
    search: SearchRequest
  ): Observable<Response<Pagination<GoodsItem[]>>> {
    return this.httpClient.get<Response<Pagination<GoodsItem[]>>>(
      `${this.apiUrl}/products?page=${req.page || 1}&limit=${
        req.limit || 10
      }&query=${search.query || ''}${search.type ? '&type=' + search.type : ''}`
    );
  }

  public createPaymentLink(req: PaymentRequest): Observable<{ url: string }> {
    return this.httpClient.post<{ url: string }>(
      `${this.apiUrl}/create-payment-link`,
      req
    );
  }
}
