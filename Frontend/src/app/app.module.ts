import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';
import { AuthMenuComponent } from './components/auth-area/auth-menu/auth-menu.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import {MatIconModule} from '@angular/material/icon'
import { JwtInterceptor } from './services/jwt.interceptor';
import { ItemListComponent } from './components/items-area/item-list/item-list.component';
import { ItemCardComponent } from './components/items-area/item-card/item-card.component';
import { ShoppingCartComponent } from './components/cart-area/shopping-cart/shopping-cart.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDialogModule} from '@angular/material/dialog';
import { CartItemComponent } from './components/cart-area/cart-item/cart-item.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { HomeComponent } from './components/layout-area/home/home.component';
import { AddItemComponent } from './components/admin-area/add-item/add-item.component';
import { AdminItemCardComponent } from './components/admin-area/admin-item-card/admin-item-card.component';
import { AdminItemListComponent } from './components/admin-area/admin-item-list/admin-item-list.component';
import { UpdateItemComponent } from './components/admin-area/update-item/update-item.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CartItemLiComponent } from './components/cart-area/cart-item-li/cart-item-li.component';
import { HighlighterPipe } from './pipes/highlighter.pipe';
import { SubmitOrderComponent } from './components/order-area/submit-order/submit-order.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    PageNotFoundComponent,
    AuthMenuComponent,
    LoginComponent,
    RegisterComponent,
    ItemListComponent,
    ItemCardComponent,
    ShoppingCartComponent,
    CartItemComponent,
    HomeComponent,
    AddItemComponent,
    AdminItemCardComponent,
    AdminItemListComponent,
    UpdateItemComponent,
    CartItemLiComponent,
    HighlighterPipe,
    SubmitOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,

    MatIconModule,
    MatSidenavModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    
  ],
  providers: [{
    useClass: JwtInterceptor,
    provide: HTTP_INTERCEPTORS,
    multi: true
  }],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
