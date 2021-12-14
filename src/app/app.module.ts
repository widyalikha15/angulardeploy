import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component'; 
import { httpInterceptorProviders } from './pages/http-interceptors'; 
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component'; 
import { SigninComponent } from './pages/signin/signin.component'; 
import { SignupComponent } from './pages/signup/signup.component'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './pages/payment/payment.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClickablesModule } from './components/clickables/clickables.module';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent,
    PageNotFoundComponent,
    PaymentComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    ClickablesModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
