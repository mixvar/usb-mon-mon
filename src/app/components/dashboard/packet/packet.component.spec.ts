import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacketComponent } from './packet.component';

describe('PacketComponent', () => {
  let component: PacketComponent;
  let fixture: ComponentFixture<PacketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
