import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMarkerModalComponent } from './add-marker-modal.component';

describe('AddSponsorModalComponent', () => {
  let component: AddMarkerModalComponent;
  let fixture: ComponentFixture<AddMarkerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMarkerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMarkerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
