import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component'; 
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component'; 
import { AuthGuard } from 'src/app/guards/auth.guard';
//import { MovieComponent } from '.pages/movie/movie.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component'; 
import { PaymentComponent } from './pages/payment/payment.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
//import { StudioComponent } from './studio/studio.component';

const routes: Routes = [
  // untuk redirect berdasarkan path
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  //{ path: '', redirectTo: '/home', pathMatch: 'full' },
  // load component berdasarkan path yang dituju
  { path: 'home', component: HomeComponent },

  

  /* {
    path: 'session26',
    component: AppComponent,
    children: [
      { path: '', redirectTo: 'signin', pathMatch: 'full' },
      // localhost:4200/session26/signin
      { path: 'signin', component: SigninComponent },
      // localhost:4200/session26/signup
      { path: 'signup', component: SignupComponent },
      // localhost:4200/session26/studios
      // Untuk mengimplementasikan guard-nya, bisa kita tambahkan property
      // canActivate yang bertipe data Array, lalu masukkan AuthGuard di dalamnya
      // seperti pada contoh ini.
      //{ path: 'studios', component: StudioComponent, canActivate: [AuthGuard] },
      //{ path: 'movies', component: MovieComponent, canActivate: [AuthGuard] },
    ]
  }, */
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  //{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  //{ path: 'dashboard', component: DashboardComponent},
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
  //{ path: 'payment', component: PaymentComponent},
  // jika tidak ada path yang sama, Angular akan load ini
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
