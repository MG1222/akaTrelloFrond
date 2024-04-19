import { Component, OnInit } from "@angular/core";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"],
})
export class NavComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit(): void {}
}
