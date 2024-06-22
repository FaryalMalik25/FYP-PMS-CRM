import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientInvoicesComponent } from './client-invoices.component';

describe('ClientInvoicesComponent', () => {
  let component: ClientInvoicesComponent;
  let fixture: ComponentFixture<ClientInvoicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientInvoicesComponent]
    });
    fixture = TestBed.createComponent(ClientInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
