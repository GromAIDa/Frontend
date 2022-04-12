import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCancelModalComponent } from './payment-cancel-modal.component';

describe('PaymentCancelModalComponent', () => {
  let component: PaymentCancelModalComponent;
  let fixture: ComponentFixture<PaymentCancelModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentCancelModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentCancelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
