import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VesselcreationComponent } from './vesselcreation.component';

describe('VesselcreationComponent', () => {
  let component: VesselcreationComponent;
  let fixture: ComponentFixture<VesselcreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VesselcreationComponent]
    });
    fixture = TestBed.createComponent(VesselcreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
