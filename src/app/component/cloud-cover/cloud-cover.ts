import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-cloud-cover',
  imports: [],
  template: `
    <div class="cloud-cover" [style.width.px]="size()">
      <svg class="circle-svg" viewBox="0 0 100 100">
        <circle class="circle-bg" cx="50" cy="50" r="45" />
        @if (cloudCover() !== 0) {
        <circle
          class="circle-progress"
          cx="50"
          cy="50"
          r="45"
          [style.stroke-dashoffset]="circumference * (1 - cloudCover() / 100)"
        />
        }
      </svg>

      <p [style.margin-top.px]="-size() / 1.6">
        Cloud cover <br />
        {{ cloudCover() }}%
      </p>
    </div>
  `,
  styles: [
    `
      p {
        font-size: 0.75rem;
      }
      .cloud-cover {
        text-align: center;
      }
      .circle-container {
        position: relative;
      }

      .circle-svg {
        transform: rotate(-90deg);
        width: 100%;
        height: 100%;
      }
      .circle-bg {
        fill: none;
        stroke: #0008ffff;
        stroke-width: 10;
      }
      .circle-progress {
        fill: none;
        stroke: #b0b0b0ff;
        stroke-width: 10;
        stroke-linecap: round;
        stroke-dasharray: 283;
        transition: stroke-dashoffset 0.5s ease;
      }
      .circle-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 20px;
        font-weight: bold;
      }
    `,
  ],
})
export class CloudCover {
  cloudCover = input<number>(0);
  circumference = 2 * Math.PI * 45;
  size = signal(100);
}
