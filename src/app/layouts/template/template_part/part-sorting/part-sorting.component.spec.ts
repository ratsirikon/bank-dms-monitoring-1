import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartSortingComponent } from './part-sorting.component';

describe('PartSortingComponent', () => {
  let component: PartSortingComponent;
  let fixture: ComponentFixture<PartSortingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartSortingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartSortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
