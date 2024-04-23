import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";


  constructor(private auth: AuthService, private route: Router) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    const response =  await this.auth.login(this.email, this.password)
    console.log(response + ' response');
    await this.route.navigate(['project']);



  }
}
