import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CredentialsModel } from '../models/credentials.model';
import { CustomerModel } from '../models/customer.model';
import { loginAction, logoutAction, registerAction } from '../redux/auth-state';
import store from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public async register(customer: CustomerModel): Promise<void> {
    const token = await firstValueFrom(this.http.post<string>(environment.registerUrl, customer));
    store.dispatch(registerAction(token));
  }

  public async login(credentials: CredentialsModel): Promise<void> {
    const token = await firstValueFrom(this.http.post<string>(environment.loginUrl, credentials));
    store.dispatch(loginAction(token));
  }

  public logout(): void {
    store.dispatch(logoutAction());
  }

  //console.log(typeof(isTaken)) says its a boolean, 
  //though when Im returning boolean it acts like isTaken is a string and throws an err.
  public async isEmailAndIdExists(customer: CustomerModel): Promise<any> {
    const isTaken = await firstValueFrom(this.http.post<string>(environment.isTakenUrl, customer));
    return isTaken;
  }

}
