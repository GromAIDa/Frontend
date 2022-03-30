import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isOpenedNav: boolean = false;
  constructor(private router: Router) {}

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

  toggleMenu(router: string) {
    this.isOpenedNav = !this.isOpenedNav;
    this.changeBody();
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
