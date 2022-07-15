import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thank-you',
  template: `
    <div class="container">
      <h1 class="title">Thank you!</h1>
      <p class="content">Your order is on the way</p>
      <div>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur fugit
        nam sint magnam dicta, rerum consequatur officia aliquid laborum quas
        laboriosam porro! Nesciunt quo deleniti voluptate voluptatem numquam
        harum ad?
      </div>
    </div>
  `,
  styleUrls: ['./thank-you.component.scss'],
})
export class ThankYouComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
