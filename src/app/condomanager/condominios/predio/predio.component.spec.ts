import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredioComponent } from './predio.component';

describe('PredioComponent', () => {
  let component: PredioComponent;
  let fixture: ComponentFixture<PredioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
