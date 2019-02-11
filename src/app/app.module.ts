import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// import { HttpModule } from '@angular/http';
import {ShoppingListModule} from "./shopping-list/shopping-list.module";
import {SharedModule} from "./shared/shared.module";
import {AuthModule} from "./auth/auth.module";
import {CoreModule} from "./core/core.module";
import {HttpClientModule} from "@angular/common/http";
import { StoreModule } from '@ngrx/store'
import { shoppingListReducer } from "./shopping-list/store/shopping-list.reducers";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AuthModule,
    // feature modules need to be before App Routing Modules
    ShoppingListModule,
    AppRoutingModule,
    // HttpModule,
    HttpClientModule,
    StoreModule.forRoot({shoppingList: shoppingListReducer}),
    CoreModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
