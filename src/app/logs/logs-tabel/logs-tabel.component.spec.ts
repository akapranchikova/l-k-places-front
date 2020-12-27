import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsTabelComponent } from './logs-tabel.component';

describe('LogsTabelComponent', () => {
  let component: LogsTabelComponent;
  let fixture: ComponentFixture<LogsTabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogsTabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsTabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
