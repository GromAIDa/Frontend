import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ModalService } from '../modal';

@Component({
  selector: 'app-payment-success-modal',
  templateUrl: './payment-success-modal.component.html',
  styleUrls: ['./payment-success-modal.component.scss']
})
export class PaymentSuccessModalComponent implements OnInit {
  amount!: string

  constructor(private route: ActivatedRoute, private modalService: ModalService, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        if(params['payment'] === 'success'){
          this.modalService.open(`${params['payment']}-modal`)
          this.amount = params['amount']
          setTimeout(() => {
            // this.modalService.close(`${params['payment']}-modal`)
            this.router.navigate(
              ['.'], 
              {
                relativeTo: this.route,
                queryParams: {payment: null, amount: null}, 
                queryParamsHandling: 'merge', // remove to replace all query params by provided
              });
          }, 2500)
        }
      }
    );
  }

}
