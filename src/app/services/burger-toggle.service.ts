import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BurgerToggleService {
  public isOpenedNav: boolean = false;
  constructor(public router: Router) { }

  toggleMenu(router?: string) {
    this.isOpenedNav = !this.isOpenedNav;
    this.changeBody();
    if(router) {
      this.openRouter(router);
    }
  }

  openRouter(router: string) {
    this.router.navigate([router]);
  }

  changeBody() {
    if (!this.isOpenedNav) {
      document.getElementsByTagName('body')[0].classList.remove('hidden');
    } else {
      document.getElementsByTagName('body')[0].classList.add('hidden');
    }
  }
}
