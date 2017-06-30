import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacketsListComponent } from './packets-list.component';

describe('PacketsListComponent', () => {
  let component: PacketsListComponent;
  let fixture: ComponentFixture<PacketsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacketsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacketsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
