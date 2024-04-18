import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-nav",
  template: `
    <nav>
      <a routerLink="/home" routerLinkActive="active">Home</a>
      <a routerLink="/about" routerLinkActive="active">About</a>
      <a routerLink="/contact" routerLinkActive="active">Contact</a>
      <a routerLink="/form" routerLinkActive="active">Form</a>
      <a routerLink="/login" routerLinkActive="active">Login</a>
    </nav>
  `,
  styleUrls: ["./nav.component.scss"],
})
export class NavComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
