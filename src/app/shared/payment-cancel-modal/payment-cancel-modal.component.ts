import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../modal';

@Component({
  selector: 'app-payment-cancel-modal',
  templateUrl: './payment-cancel-modal.component.html',
  styleUrls: ['./payment-cancel-modal.component.scss']
})
export class PaymentCancelModalComponent implements OnInit {

  constructor(private route: ActivatedRoute, private modalService: ModalService, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        if (params['payment'] === 'cancel') {
          this.modalService.open(`${params['payment']}-modal`)
          setTimeout(() => {
            this.modalService.close(`${params['payment']}-modal`)
            this.router.navigate(
              ['.'],
              {
                relativeTo: this.route,
                queryParams: { payment: null },
                queryParamsHandling: 'merge', // remove to replace all query params by provided
              });
          }, 2500)
        }
      }
      );
  }

}
