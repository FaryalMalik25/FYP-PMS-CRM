import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDetailComponent } from './invoice-detail.component';

describe('InvoiceDetaiComponent', () => {
  let component: InvoiceDetailComponent;
  let fixture: ComponentFixture<InvoiceDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceDetailComponent]
    });
    fixture = TestBed.createComponent(InvoiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
