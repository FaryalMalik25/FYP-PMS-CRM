import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInvoiceComponent } from './add-invoice.component';

describe('InvoiceFormComponent', () => {
  let component: AddInvoiceComponent;
  let fixture: ComponentFixture<AddInvoiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddInvoiceComponent]
    });
    fixture = TestBed.createComponent(AddInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
