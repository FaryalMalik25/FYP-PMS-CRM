import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientProjectsComponent } from './client-projects.component';

describe('ClientProjectsComponent', () => {
  let component: ClientProjectsComponent;
  let fixture: ComponentFixture<ClientProjectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientProjectsComponent]
    });
    fixture = TestBed.createComponent(ClientProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
