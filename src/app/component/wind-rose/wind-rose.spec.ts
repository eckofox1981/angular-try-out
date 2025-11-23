import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindRose } from './wind-rose';

describe('WindRose', () => {
  let component: WindRose;
  let fixture: ComponentFixture<WindRose>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WindRose]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WindRose);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
