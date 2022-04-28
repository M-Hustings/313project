import { Injectable } from '@angular/core';
import { ACCOUNTS } from './db-account';
import { Account } from './account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accounts: Account[] = ACCOUNTS; //list of accounts
  private account_id: number = -1;             //currently signed in account (or -1 of no account is logged in)

  constructor() {}

  //returns true if login successful, false if not
  public login(email: string, password: string): boolean {
    this.account_id = -1;
    this.accounts.forEach(acc => {
      if (acc.email == email && acc.password == password) {
        this.account_id = acc.id;
      }
    });
    return this.account_id != -1;
  }

  //returns account id if user is logged in, or -1 if no account is logged in
  public getAccount(): number {
    return this.account_id;
  }

  //sign out of current account
  public logout(): void {
    this.account_id = -1;
  }

  //returns true if account created, false if email is taken
  //param should be an account without id or admin values (those are assigned here)
  //successfully creating an account will also log into the new account
  public createAccount(new_account: Account): boolean {
    let email_taken = false;
    let id = 1;
    this.accounts.forEach(acc => {
      if(acc.id >= id)
        id = acc.id+1
      if(acc.email = new_account.email)
        email_taken = true;
    });
    if(!email_taken) {
      new_account.id = id;
      new_account.admin = false;
      this.accounts.push(new_account);
      this.login(new_account.email,new_account.password);
    }
    return !email_taken;
  }

  //deletes the current account
  public deleteAccount(account: Account): void {
    this.accounts = this.accounts.filter(acc => acc !== account);
  }

}
