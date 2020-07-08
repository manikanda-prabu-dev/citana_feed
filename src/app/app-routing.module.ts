import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';


const routes: Routes = [
  { path: '',   redirectTo: '/dashboard', pathMatch: 'full' },
  {path : "register" , component :  RegisterComponent},
  {path : "login" , component : LoginComponent},
  {path : "dashboard" , component : DashboardComponent},
  {path : "**" , component : ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
