import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminItemListComponent } from './components/admin-area/admin-item-list/admin-item-list.component';
import { UpdateItemComponent } from './components/admin-area/update-item/update-item.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { ShoppingCartComponent } from './components/cart-area/shopping-cart/shopping-cart.component';
import { ItemListComponent } from './components/items-area/item-list/item-list.component';
import { HomeComponent } from './components/layout-area/home/home.component';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';
import { SubmitOrderComponent } from './components/order-area/submit-order/submit-order.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "logout", component: LogoutComponent },
  { path: "item-list", component: ItemListComponent },
  { path: "shopping-cart", component: ShoppingCartComponent },
  { path: "submit-order", component: SubmitOrderComponent },
  
  { path: "item-list-admin", component: AdminItemListComponent },
  { path: "update-item/:_id", component: UpdateItemComponent },

  { path: "", redirectTo: "/home", pathMatch: "full" }, 
  { path: "**", component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
