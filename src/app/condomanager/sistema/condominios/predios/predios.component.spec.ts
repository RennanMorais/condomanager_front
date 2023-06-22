import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrediosComponent } from './predios.component';

describe('PrediosComponent', () => {
  let component: PrediosComponent;
  let fixture: ComponentFixture<PrediosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrediosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrediosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
