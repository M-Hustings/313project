import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  @Output() changePage = new EventEmitter<number>();

  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  showError: boolean = false;
  showSuccess: boolean = false;
  showEmailTaken: boolean = false;

  constructor(private accService: AccountService) { }

  ngOnInit(): void {}

  tryCreate(): void {
    if(this.firstname && this.lastname && this.email && this.password) {
      let newAcc: Account = {firstname: this.firstname, lastname: this.lastname, email: this.email, password: this.password, id: 0, admin: false}
      let success = this.accService.createAccount(newAcc);
      this.showError = false;
      this.showEmailTaken = !success;
      this.showSuccess = success;
    }
    else {
      this.showError=true;
      this.showSuccess=false;
      this.showEmailTaken = false;
    }
  }

  toLoginPage(): void {
    this.changePage.emit(1);
  }

}
