import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondominioComponent } from './condominio.component';

describe('CondominioComponent', () => {
  let component: CondominioComponent;
  let fixture: ComponentFixture<CondominioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CondominioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CondominioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
