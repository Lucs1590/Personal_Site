import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './secondary-components/not-found/not-found.component';
import { PublicationsComponent } from './secondary-components/publications/publications.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SeparadorComponent } from './separador/separador.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./separador/separador.module').then(m => m.SeparadorModule), title: 'Lucas Brito - Personal Website' },
  { path: 'publications', loadChildren: () => import('./secondary-components/publications/publications.module').then(m => m.PublicationsModule), title: 'Lucas Brito - Publications' },
  { path: 'portfolio', loadChildren: () => import('./portfolio/portfolio.module').then(m => m.PortfolioModule), title: 'Lucas Brito - Portfolio' },
  { path: '404', component: NotFoundComponent, title: '404 - Not Found' },
  { path: '**', redirectTo: '404', pathMatch: 'full', title: '404 - Not Found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
