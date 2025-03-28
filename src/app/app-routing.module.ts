import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './secondary-components/not-found/not-found.component';
import { PublicationsComponent } from './secondary-components/publications/publications.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SeparadorComponent } from './separador/separador.component';
import { PrivacyPolicyComponent } from './secondary-components/privacy-policy/privacy-policy.component';
import { ProjectDetailComponent } from './secondary-components/project-detail/project-detail.component';
import { RecommendationsComponent } from './secondary-components/recommendations/recommendations.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: SeparadorComponent, title: 'Lucas Brito - Personal Website' },
  { path: 'publications', component: PublicationsComponent, title: 'Lucas Brito - Publications' },
  { path: 'portfolio', component: PortfolioComponent, title: 'Lucas Brito - Portfolio' },
  { path: 'portfolio/project/:id', component: ProjectDetailComponent, title: 'Lucas Brito - Project Detail' },
  { path: 'privacy', component: PrivacyPolicyComponent, title: 'Lucas Brito - Privacy Policy' },
  { path: 'recommendations', component: RecommendationsComponent, title: 'Lucas Brito - Recommendations' },
  { path: '404', component: NotFoundComponent, title: '404 - Not Found' },
  { path: '**', redirectTo: '404', pathMatch: 'full', title: '404 - Not Found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
