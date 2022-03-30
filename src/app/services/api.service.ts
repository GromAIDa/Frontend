import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pagination } from '../core/types/pagination';
import { PaginationsRequest } from '../core/types/paginations.request';
import { Report } from '../core/types/report';
import { Response } from '../core/types/response';
import { TotalDonations } from '../core/types/totalDonations';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private httpClient: HttpClient,
  ) { }

  apiUrl = environment.API_URL;

  public getReports(req: PaginationsRequest): Observable<Response<Pagination<Report[]>>> {
    return this.httpClient.get<Response<Pagination<Report[]>>>(
      `${this.apiUrl}/report?page=${req.page || 1}&limit=${req.limit || 10}`,
    );
  }

  public getTotalDontions(): Observable<Response<TotalDonations>> {
    return this.httpClient.get<Response<TotalDonations>>(
      `${this.apiUrl}/total`,
    );
  }
}
