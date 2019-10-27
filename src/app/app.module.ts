import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppMembersComponent } from './app.members.component';

@NgModule({
  declarations: [
    AppComponent,
    AppMembersComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent, AppMembersComponent],
})
export class AppModule { }
