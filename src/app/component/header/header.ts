import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  template: `
    <header>
      <h1 class="title">EckoWx - Angular</h1>
      <div>
        <button routerLink="">Home</button>
        <button routerLink="forecasts">Forecast</button>
      </div>
    </header>
  `,
  styles: `
    header {
    width: 100%;
    height: 3rem;
    background-color: darkblue;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .title {
    color: white;
    margin: 0 auto;
  }

  div {
    display: flex;
    gap: 1rem;
    margin-right: 1rem
  }

  button {
    border: 0;
    background-color: yellow;
    color: darkblue;
    padding: 0.5rem;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    height: 2rem;
    width: 6rem;
    font-weight: 900;
  }

  
  `,
})
export class Header {}
