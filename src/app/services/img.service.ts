import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ImgService {
  url: string = environment.API_URL

  getUrlImg(name: string) {
    return `${this.url}/img?photo=${name}`;
  }
}
