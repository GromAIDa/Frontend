import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isOpenedNav: boolean = false;
  constructor() {}

  ngOnInit(): void {
    document
      .getElementsByTagName('body')[0]
      ?.addEventListener('click', (ev: any) => {
        if (!ev?.path?.find((element: any) => element.id === 'click-outside')) {
          this.isOpenedNav = false;
          this.changeBody();
        }
      });
  }

  toggleMenu() { 
    this.isOpenedNav = !this.isOpenedNav;
    this.changeBody();
  }

  changeBody() {
    if (!this.isOpenedNav) {
      document.getElementsByTagName('body')[0].classList.remove('hidden');
    } else {
      document.getElementsByTagName('body')[0].classList.add('hidden');
    }
  }
}
