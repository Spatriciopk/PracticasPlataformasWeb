import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarGastosComponent } from './mostrar-gastos.component';

describe('MostrarGastosComponent', () => {
  let component: MostrarGastosComponent;
  let fixture: ComponentFixture<MostrarGastosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarGastosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
