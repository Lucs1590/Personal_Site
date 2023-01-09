import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { NotFoundComponent } from './secondary-components/not-found/not-found.component';
import { PublicationsComponent } from './secondary-components/publications/publications.component';
import { SeparadorComponent } from './separador/separador.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: SeparadorComponent },
  { path: '404', component: NotFoundComponent },
  { path: 'publications', component: PublicationsComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: '**', redirectTo: '404' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
