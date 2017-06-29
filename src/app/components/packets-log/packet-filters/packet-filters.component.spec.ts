import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacketFiltersComponent } from './packet-filters.component';

describe('PacketFiltersComponent', () => {
  let component: PacketFiltersComponent;
  let fixture: ComponentFixture<PacketFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacketFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacketFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
