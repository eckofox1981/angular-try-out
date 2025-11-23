import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-title',
  imports: [],
  template: ` <h1>{{ title() }}</h1> `,
  styles: ``,
})
export class PageTitle {
  title = input('Default greeting');
}
