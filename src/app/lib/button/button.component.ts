import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styles: [
    `
      button {
        line-height: 1.5;
        width: 12dvw;
        padding: 0.5rem 0;
      }
    `,
  ],
})
export class ButtonComponent implements OnInit {
  @Input() title!: string;
  @Output() onclick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClick(): void {
    this.onclick.emit();
  }
}
