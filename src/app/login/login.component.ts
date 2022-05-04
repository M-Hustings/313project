import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  showError: boolean = false;
  showSuccess: boolean = false;

  constructor(private accService: AccountService) {}

  ngOnInit(): void {}

  tryLogin(): void {
    console.log("Attempting login with email: "+this.email.replace(" ","")+" ; password: "+this.password.replace(" ",""));
    let success = this.accService.login(this.email.replace(" ",""),this.password.replace(" ",""));
    this.showError = !success;
    this.showSuccess = success;
  }

  toCreateAccountPage(): void {
    
  }

}
