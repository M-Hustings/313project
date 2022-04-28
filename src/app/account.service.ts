import { Injectable } from '@angular/core';
import { ACCOUNTS } from './db-account';
import { Account } from './account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accounts: Account[] = ACCOUNTS; //list of accounts
  private account_id: number = -1;        //currently signed in account id (or -1 of no account is logged in)

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

  //returns Account if user is logged in or null if not
  public getAccount(): Account | null {
    let find_account = this.accounts.filter(acc => acc.id == this.account_id);
    if(find_account.length == 0)
      return null;
    else
      return find_account[0];
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
      this.account_id = id;
    }
    return !email_taken;
  }

  //deletes the current account
  public deleteAccount(account: Account): void {
    this.accounts = this.accounts.filter(acc => acc !== account);
    this.account_id = -1;
  }

}
