import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentWeatherData } from './current-weather-data';

describe('CurrentWeatherData', () => {
  let component: CurrentWeatherData;
  let fixture: ComponentFixture<CurrentWeatherData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentWeatherData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentWeatherData);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
