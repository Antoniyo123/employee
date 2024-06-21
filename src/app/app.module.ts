import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id';


registerLocaleData(localeId);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AddEmployeeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'id'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
