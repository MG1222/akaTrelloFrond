import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../service/auth.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  msgError: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';


  constructor(private auth: AuthService, private route: Router,private http: HttpClient) { }

  ngOnInit(): void {
  }


  onSubmit() {
    if (this.verifiesPassword(this.password, this.confirmPassword)) {
      this.auth.register(this.email, this.password).then(() => {
        this.route.navigate(['login']);
      })
    }else {
      this.msgError = 'Mot de passe non identique';

    }
  }

  verifiesPassword(password: string, confirmPassword: string): boolean {
    if (password !== confirmPassword) {
      this.msgError = 'Mot de passe non identique';
      return false;
    }
    return true;


  }
}
