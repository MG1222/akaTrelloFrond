import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../service/auth.service";
import {Router} from "@angular/router";

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


  constructor(private auth: AuthService, private route: Router) { }

  ngOnInit(): void {
  }


  onSubmit() {
    console.log(this.email, this.password, this.confirmPassword);
    let checkPassword = this.verifiesPassword(this.password, this.confirmPassword);
    if (!checkPassword) {
      console.log('error');
    }else {
        this.auth.register(this.email, this.password).then(() => {
            this.route.navigate(['/login']);
        })
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
