import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { EthersService } from 'src/app/services/ethers.service';
import { ModalService } from '../modal';
import { ApiService } from 'src/app/services/api.service';


interface Error {
  message: string
}
@Component({
  selector: 'app-donate-modal',
  templateUrl: './donate-modal.component.html',
  styleUrls: ['./donate-modal.component.scss']
})
export class DonateModalComponent implements OnInit {
 
  

  

  isClicked: boolean = false;
  methods = new FormGroup({
    method: new FormControl('card')
  })

  paymentDataForm = new FormGroup({
    address: new FormControl({ value: environment.ADDRESS, disabled: true }),
    amount: new FormControl(0),
  });
  errors: string[] = []
  constructor(
    public ethersService: EthersService,
    private modalService: ModalService,
    private api: ApiService
  ) { }

  ngOnInit(): void {
   
  }
 
  async startTransaction(e: Event) {
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

  async createPayment(){
    this.api.createPaymentLink({currency: environment.CURRENCY, description: 'donate', amount: this.paymentDataForm.value.amount, success_url: environment.SUCCESS_URL, cancel_url: environment.CANCEL_URL}).subscribe(value => console.log(value))
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
