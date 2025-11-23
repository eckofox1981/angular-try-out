import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <footer>
      <i>©️ Copyright Ecko Fox corporation</i>
    </footer>
  `,
  styles: `
  footer {
    width: 100%;
    height: 3rem;
    background-color: lightblue;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  `,
})
export class Footer {}
