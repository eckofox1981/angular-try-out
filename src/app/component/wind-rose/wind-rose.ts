import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-wind-rose',
  imports: [],
  template: `
    <div class="wind-rose-wrapper">
      <!-- Beaufort background bar -->
      <div class="beaufort-bar">
        <div class="beaufort-fill" [style.width.%]="100 - beaufortPercent()"></div>
      </div>

      <!-- Rotating arrow -->
      <svg
        class="arrow"
        viewBox="0 0 100 100"
        [style.transform]="'rotate(' + (windDirection() + 180) + 'deg)'"
      >
        <polygon points="50,10 60,40 50,30 40,40" class="arrow-head" />
        <rect x="47" y="40" width="6" height="45" rx="3" class="arrow-body"></rect>
      </svg>

      <div class="wind-info">{{ windDirection() }}° — {{ windSpeed() }} m/s</div>
    </div>
  `,
  styles: `
    .wind-rose-wrapper {
      position: relative;
      width: 100px;
      height: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 0;
      
    }

    /* Beaufort bar */
    .beaufort-bar {
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        #9be7ff 0%,
        #3fa9f5 25%,
        #f7ce46 50%,
        #ff8e53 75%,
        #d84315 100%
      );
      
      border-radius: 6px;
      overflow: hidden;
      margin-bottom: 8px;
    }

    .beaufort-fill {
      margin-right: 0;
      margin-left: auto;
      position: relative;
      z-index: 10;
      height: 100%;
      transition: width 0.4s ease;
      background: #eee;
      
    }

    /* Arrow */
    .arrow {
      position: absolute;
      top: 15px;
      z-index: 11;
      width: 75px;
      height: 75px;
      transition: transform 0.5s ease-in-out;
    }
    .arrow-head {
      fill: #d84315;
    }
    .arrow-body {
      fill: #444;
    }

    .wind-info {
      margin-top:-2rem;
      margin-bottom: 0;
      font-size: 0.9rem;
      z-index: 11;
      font-size: 0.75rem
    }
  `,
})
export class WindRose {
  windDirection = input<number>(0);
  windSpeed = input<number>(0);

  // Convert m/s → Beaufort
  beaufort = computed(() => {
    const v = this.windSpeed();
    if (v < 0.3) return 0;
    if (v < 1.6) return 1;
    if (v < 3.4) return 2;
    if (v < 5.5) return 3;
    if (v < 8.0) return 4;
    if (v < 10.8) return 5;
    if (v < 13.9) return 6;
    if (v < 17.2) return 7;
    if (v < 20.8) return 8;
    if (v < 24.5) return 9;
    if (v < 28.5) return 10;
    if (v < 32.7) return 11;
    return 12;
  });

  beaufortPercent = computed(() => (this.beaufort() / 12) * 100);
}
