import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyTimeFinderComponent } from './journey-time-finder.component';

describe('JourneyTimeFinderComponent', () => {
  let component: JourneyTimeFinderComponent;
  let fixture: ComponentFixture<JourneyTimeFinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JourneyTimeFinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneyTimeFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
