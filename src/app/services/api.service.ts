import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pagination } from '../types/pagination';
import { Report } from '../types/report';
import { Response } from '../types/response';
import { TotalDonations } from '../types/totalDonations';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private httpClient: HttpClient,
  ) { }

  apiUrl = environment.API_URL;

  public getReports(): Observable<Response<Pagination<Report[]>>> {
    return this.httpClient.get<Response<Pagination<Report[]>>>(
      `${this.apiUrl}/report`,
    );
  }

  public getTotalDontions(): Observable<Response<TotalDonations>> {
    return this.httpClient.get<Response<TotalDonations>>(
      `${this.apiUrl}/total`,
    );
  }
}
