import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoodsItem } from '@interfaces/goodsItem';
import { Pagination } from '@interfaces/pagination';
import { PaginationRequest } from '@interfaces/paginations.request';
import { Report } from '@interfaces/report';
import { Response } from '@interfaces/response';
import { SearchRequest } from '@interfaces/searchRequest';
import { TotalDonations } from '@interfaces/totalDonations';
import { PaymentRequest } from '@interfaces/paymentRequest';
import { environment } from 'environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastService } from '@services/toast/toast.service';
import { IVerifyCode } from '@interfaces/verifyCode.interface';
import { IRegisterRequest } from '@interfaces/register.interface';
import { Post } from '@interfaces/post';

export interface IError {
  value: string;
  msg: string;
  param: string;
  location: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient, private toast: ToastService) {}

  apiUrl = environment.API_URL;

  public getReports(
    req: PaginationRequest
  ): Observable<Response<Pagination<Report[]>>> {
    return this.httpClient.get<Response<Pagination<Report[]>>>(
      `${this.apiUrl}/report?page=${req.page || 1}&limit=${
        req.limit || 10
      }&time=${req.time}`
    );
  }

  public getPosts(
    req: PaginationRequest
  ): Observable<Response<Pagination<Post[]>>> {
    return this.httpClient.get<Response<Pagination<Post[]>>>(
      `${this.apiUrl}/posts?page=${req.page || 1}&limit=${
        req.limit || 10
      }&time=${req.time}`
    );
  }

  public postView(
    req: string
  ): Observable<{}> {
    return this.httpClient.post<Response<{}>>(
      `${this.apiUrl}/post-view?id=${req}`,{}
    );
  }

  public getTotalDonations(): Observable<Response<TotalDonations>> {
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
    req: PaginationRequest,
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

  public verifyEmail(email: string): Observable<string> {
    return this.httpClient
      .put<string>(`${this.apiUrl}/email-verification`, email)
  }

  public verifyCode(data: IVerifyCode): Observable<IVerifyCode> {
    return this.httpClient
      .post<IVerifyCode>(`${this.apiUrl}/email-verification`, data)
  }

  public sendData(data: IRegisterRequest): Observable<IRegisterRequest> {
    return this.httpClient
      .post<IRegisterRequest>(`${this.apiUrl}/register`, data)
  }

  public subscribeUpdate(data: {email: string}) {
    return this.httpClient
      .post(`${this.apiUrl}/subscribe-update`, data)
  }
}
