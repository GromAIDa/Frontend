import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SuccessModalComponent } from '@pages/volunteer/components/success-modal/success-modal.component';
import { ApiService } from '@services/api/api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  email = new FormControl('', [Validators.email]);

  constructor(private api: ApiService, private dialog: MatDialog) {}

  subscribe(){
    this.api.subscribeUpdate({email: this.email.value}).subscribe(()=> {
      this.dialog
      .open(SuccessModalComponent, {
        data: {
          text: 'Thank you. We will notify you when we update anything.',
          button: {
            text: 'Close',
            href: '/',
          },
        },
      })
      .afterClosed()
    })
  }
}
