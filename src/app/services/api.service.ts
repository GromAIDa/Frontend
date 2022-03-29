import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private httpClient: HttpClient,
  ) { }

  apiUrl = environment.API_URL;

  public getReports(): Observable<any> {
    return this.httpClient.get<any>(
      `${this.apiUrl}/report`,
    );
  }
}
