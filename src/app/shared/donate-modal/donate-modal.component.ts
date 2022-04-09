import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { StripeService, StripeCardNumberComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
  PaymentIntent,
} from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';
import { EthersService } from 'src/app/services/ethers.service';
import { ModalService } from '../modal';


interface Error {
  message: string
}
@Component({
  selector: 'app-donate-modal',
  templateUrl: './donate-modal.component.html',
  styleUrls: ['./donate-modal.component.scss']
})
export class DonateModalComponent implements OnInit {
  @ViewChild(StripeCardNumberComponent) card!: StripeCardNumberComponent;

  cardOptions: StripeCardElementOptions = {
    iconStyle: 'solid',
    style: {
      base: {
        iconColor: '#c4f0ff',
        color: '#fff',
        fontWeight: 500,
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '16px',
        fontSmoothing: 'antialiased',
        ':-webkit-autofill': {color: '#fce883'},
        '::placeholder': {color: '#87bbfd'}
      },
      invalid: {
        iconColor: '#ffc7ee',
        color: '#ffc7ee'
      }
    }
  };
  elementsOptions: StripeElementsOptions = {
    locale: 'es',
  };

  stripeTest!: FormGroup;

  isClicked: boolean = false;
  methods = new FormGroup({
    method: new FormControl('card')
  })

  paymentDataForm = new FormGroup({
    address: new FormControl({ value: environment.ADDRESS, disabled: true }),
    amount: new FormControl('300'),
  });
  errors: string[] = []
  constructor(
    public ethersService: EthersService,
    private modalService: ModalService,
    private http: HttpClient,
    private fb: FormBuilder,
    private stripeService: StripeService
  ) { }

  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ['Angular v10', [Validators.required]],
      amount: [1001, [Validators.required, Validators.pattern(/\d+/)]],
    });
  }
  pay(): void {
    if (this.stripeTest.valid) {
      console.log(this.card);
      
      this.createPaymentIntent(this.stripeTest.get('amount')?.value)
        .pipe(
          switchMap((pi) =>
            this.stripeService.confirmCardPayment(pi.client_secret as string, {
              payment_method: {
                card: this.card.element,
                billing_details: {
                  name: this.stripeTest.get('name')?.value,
                },
              },
            })
          )
        )
        .subscribe((result) => {
          if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            console.log(result.error.message);
          } else {
            // The payment has been processed!
            if (result.paymentIntent?.status === 'succeeded') {
              // Show a success message to your customer
            }
          }
        });
    } else {
      console.log(this.stripeTest);
    }
  }
  createPaymentIntent(amount: string): Observable<PaymentIntent> {
    return this.http.post<PaymentIntent>(
      `${environment.API_URL}/create-payment-intent`,
      { amount: Number(amount)*100 }
    );
  }
  async startTransaction(e: Event) {
    if (this.methods.get('method')?.value === 'card') {
      try {
        //  const res =  this.stripeService.createPaymentMethod({number: '4242424242424242', exp_month: 4, exp_year: 24, csv: '424'})
        //   console.log(res);

      } catch (e) {
        console.log(e);

      }
      return
    }
    try {
      this.isClicked = true
      await this.ethersService.transferUsdc(environment.ADDRESS, this.paymentDataForm.value.amount)
    } catch (err) {
      const error = err as Error
      this.errors.push(error.message)

      return
    }
    this.isClicked = false
    this.closeModal('donate-modal');
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
