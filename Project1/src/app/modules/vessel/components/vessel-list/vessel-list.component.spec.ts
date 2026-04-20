import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VesselListComponent } from './vessel-list.component';

describe('VesselListComponent', () => {
  let component: VesselListComponent;
  let fixture: ComponentFixture<VesselListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VesselListComponent]
    });
    fixture = TestBed.createComponent(VesselListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
