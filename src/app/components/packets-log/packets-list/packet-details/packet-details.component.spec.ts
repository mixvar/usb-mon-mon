import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacketDetailsComponent } from './packet-details.component';

describe('PacketDetailsComponent', () => {
  let component: PacketDetailsComponent;
  let fixture: ComponentFixture<PacketDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacketDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacketDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
