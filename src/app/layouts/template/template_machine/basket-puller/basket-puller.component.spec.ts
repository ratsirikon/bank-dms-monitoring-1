import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketPullerComponent } from './basket-puller.component';

describe('BasketPullerComponent', () => {
  let component: BasketPullerComponent;
  let fixture: ComponentFixture<BasketPullerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasketPullerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasketPullerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
