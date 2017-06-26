import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacketsLogComponent } from './packets-log.component';

describe('PacketsLogComponent', () => {
  let component: PacketsLogComponent;
  let fixture: ComponentFixture<PacketsLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacketsLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacketsLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
