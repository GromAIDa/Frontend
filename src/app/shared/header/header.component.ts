import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BurgerToggleService } from 'src/app/services/burger-toggle.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  
  constructor(public burgerService: BurgerToggleService, public router: Router) {}

  ngOnInit(): void {
    document
      .getElementsByClassName('burger-menu')[0]
      ?.addEventListener('click', (ev: any) => {
        if (!ev?.path?.find((element: any) => element.id === 'click-outside')) {
          this.burgerService.isOpenedNav = false;
          this.burgerService.changeBody();
        }
      });
  }

  
}
