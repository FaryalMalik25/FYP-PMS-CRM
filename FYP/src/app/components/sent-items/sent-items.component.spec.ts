import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentItemsComponent } from './sent-items.component';

describe('SentItemsComponent', () => {
  let component: SentItemsComponent;
  let fixture: ComponentFixture<SentItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SentItemsComponent]
    });
    fixture = TestBed.createComponent(SentItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
