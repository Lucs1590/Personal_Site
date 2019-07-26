import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MHomeComponent } from './m-home/m-home.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'm_home', component: MHomeComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
