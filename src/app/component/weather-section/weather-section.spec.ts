import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherSection } from './weather-section';

describe('WeatherSection', () => {
  let component: WeatherSection;
  let fixture: ComponentFixture<WeatherSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
