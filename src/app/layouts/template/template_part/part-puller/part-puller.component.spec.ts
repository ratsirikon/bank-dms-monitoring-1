import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartPullerComponent } from './part-puller.component';

describe('PartPullerComponent', () => {
  let component: PartPullerComponent;
  let fixture: ComponentFixture<PartPullerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartPullerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartPullerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
