import { BrowserModule }                        from '@angular/platform-browser';

import { HttpClientModule }                     from '@angular/common/http';
import { NgModule }                             from '@angular/core';

import { AppRoutingModule }                     from './app-routing.module';

import {HttpServiceModule}                      from "./service/http/http-service.module";

import {MsaModule}                              from "./domain/msa/msa.module";
import {MsaRoutedModule}                        from "./routed/msa/msa-routed.module";

import {DashboardModule}                        from "./domain/dashboard/dashboard.module";
import {DashboardRoutedModule}                  from "./routed/dashboard/dashboard-routed.module";

import { AppComponent }                         from './app.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,

    HttpClientModule,

    AppRoutingModule,

    MsaModule,
    MsaRoutedModule,

    DashboardModule,
    DashboardRoutedModule,

    HttpServiceModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
