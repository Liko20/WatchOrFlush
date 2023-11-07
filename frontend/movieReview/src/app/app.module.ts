import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { Route, Routes } from '@angular/router';
import { TvseriesComponent } from './tvseries/tvseries.component';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component'
import { FormsModule } from '@angular/forms';
import { ThanksComponent } from './thanks/thanks.component';
import { TokenInterceptorService } from './service/token-interceptor.service';
@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    NavbarComponent,
    ReviewsComponent,
    TvseriesComponent,
    ReviewsComponent,
    RegisterComponent,
    LoginComponent,
    ThanksComponent,
    
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,  
    MatIconModule,
    FormsModule,
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
