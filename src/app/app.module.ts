import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MembersComponent } from './members/members.component';
import { StocksComponent } from './stocks/stocks.component';
import { MHeaderComponent } from './m-header/m-header.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MembersComponent,
    StocksComponent,
    MHeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent, MembersComponent],
})
export class AppModule { }
