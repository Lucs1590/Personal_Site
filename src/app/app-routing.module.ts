import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './secondary-components/not-found/not-found.component';
import { PublicationsComponent } from './secondary-components/publications/publications.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SeparadorComponent } from './separador/separador.component';
import { PrivacyPolicyComponent } from './secondary-components/privacy-policy/privacy-policy.component';
import { ProjectDetailComponent } from './secondary-components/project-detail/project-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: SeparadorComponent, title: 'Lucas Brito - Personal Website' },
  { path: 'publications', component: PublicationsComponent, title: 'Lucas Brito - Publications' },
  { path: 'portfolio', component: PortfolioComponent, title: 'Lucas Brito - Portfolio' },
  { path: 'portfolio/:id', component: ProjectDetailComponent, title: 'Lucas Brito - Project Detail' },
  { path: 'privacy-policy', component: PrivacyPolicyComponent, title: 'Lucas Brito - Privacy Policy' },
  { path: '404', component: NotFoundComponent, title: '404 - Not Found' },
  { path: '**', redirectTo: '404', pathMatch: 'full', title: '404 - Not Found' }
];

export const AppRoutingModule = RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' });
