import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cityModel } from 'src/app/models/city.model';
import { CustomerModel } from 'src/app/models/customer.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CitiesService } from 'src/app/services/cities.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  
  public isTaken: boolean;
  public customer = new CustomerModel();
  public cities: cityModel[];

  public confirmPassword: string;
  public isConfirmed: boolean;

  constructor(private authService: AuthService,
    private citiesService: CitiesService, 
    private router: Router,
    private cartService: CartService,
    private notifyService: NotifyService) { }

  async ngOnInit() {
    try{

      this.isTaken = true;
      this.isConfirmed = false;

      this.cities = await this.citiesService.getAllCities();
    }
    catch(err:any){
      this.notifyService.error(err);
    }
  } 

  public async nextStep() {
    try{

      this.isTaken = await this.authService.isEmailAndIdExists(this.customer);
      
      if(this.isTaken) {
        this.notifyService.error("Id or Email are taken, Please try again...") 
        this.isTaken = true;
      } else {
        this.isTaken = false;
      }


      if(this.customer.password !== this.confirmPassword){
        this.notifyService.error("Passwords don't match, Please try again");
        this.isConfirmed = false;
      } else {
        this.isConfirmed = true;
      }   

    }
    catch(err:any) {
      this.notifyService.error(err);
    }
  }

  public async submit() {
    try{
      await this.authService.register(this.customer);
      this.router.navigateByUrl("/item-list");
      this.notifyService.success("Welcome To Our Organic Store");
      const cart = await this.cartService.addCart();
    }
    catch(err:any) {
      this.notifyService.error(err);
    }
  }
  
}
