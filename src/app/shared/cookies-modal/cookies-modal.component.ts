import { Component } from '@angular/core';

@Component({
  selector: 'app-cookies-modal',
  templateUrl: './cookies-modal.component.html',
  styleUrls: ['./cookies-modal.component.scss']
})
export class CookiesModalComponent {

  isConsented: boolean = false;

  constructor() {
    this.isConsented = this.getCookie('cookie_consent') === 'true';
  }
 

  private getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }

  private deleteCookie(name: string) {
    this.setCookie(name, '', -1);
  }

  public setCookie(name: string, value: string, expireDays: number, path: string = '') {
    let d: Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    let expires: string = `expires=${d.toUTCString()}`;
    let cpath: string = path ? `; path=${path}` : '';
    document.cookie = `${name}=${value}; ${expires}${cpath}`;
    this.isConsented = true
  }

  // private consent(isConsent: boolean, e: any) {
  //   if (!isConsent) {
  //     return this.isConsented;
  //   } else if (isConsent) {
  //     this.setCookie('COOKIE_CONSENT', '1', 30);
  //     this.isConsented = true;
  //     e.preventDefault();
  //   }
  // }

}
