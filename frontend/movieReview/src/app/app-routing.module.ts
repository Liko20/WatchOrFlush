import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { TvseriesComponent } from './tvseries/tvseries.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import { ThanksComponent } from './thanks/thanks.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {path:"" , component:MoviesComponent},
  {path:"reviews/:id/:media_type",component:ReviewsComponent},
  {path:"tvSeries",component:TvseriesComponent},
  {path :"login" , component: LoginComponent},
  {path :"register" , component: RegisterComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
