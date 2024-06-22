import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinedProjectsComponent } from './combined-projects.component';

describe('CombinedProjectsComponent', () => {
  let component: CombinedProjectsComponent;
  let fixture: ComponentFixture<CombinedProjectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CombinedProjectsComponent]
    });
    fixture = TestBed.createComponent(CombinedProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
