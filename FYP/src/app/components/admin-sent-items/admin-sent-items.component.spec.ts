import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSentItemsComponent } from './admin-sent-items.component';

describe('AdminSentItemsComponent', () => {
  let component: AdminSentItemsComponent;
  let fixture: ComponentFixture<AdminSentItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSentItemsComponent]
    });
    fixture = TestBed.createComponent(AdminSentItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
