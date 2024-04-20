import { Component, OnDestroy, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
  counter!: number;
  counterMinutes: number = 50;
  counterHeures: number = 0;
  isPaused: boolean = false;
  today = new Date();
  id: any = 0;

  public incr(): void {
    if (!this.isPaused) {
      this.counter++;
      if (this.counter > 59) {
        this.counterMinutes += 1;
        this.counter = 0;
        if (this.counterMinutes > 59) {
          this.counterHeures += 1;
          this.counterMinutes = 0;
        }
      }
    }
  }

  public stop(): void {
    if (!this.isPaused) {
      this.isPaused = true;
      this.counter = 0;
      this.counterMinutes = 0;
      this.counterHeures = 0;
    } else {
      this.isPaused = false;
    }
  }

  public pause(): void {
    this.isPaused = !this.isPaused;
  }

  constructor() {}

  ngOnInit(): void {
    this.counter = 0;

    this.id = setInterval(() => {
      this.incr();
    }, 10);
    console.log("HomeComponent initialized");
  }

  ngOnDestroy(): void {
    clearInterval(this.id);
    console.log("HomeComponent destroyed");
  }

  clickButton(): void {
    console.log("Button clicked from HomeComponent");
  }
}
