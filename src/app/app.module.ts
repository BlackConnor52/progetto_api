import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { FormReactiveComponent } from './form-reactive/form-reactive.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormReactiveComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleMapsModule,
    ReactiveFormsModule

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
