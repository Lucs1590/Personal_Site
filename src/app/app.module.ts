import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgOptimizedImage } from '@angular/common';
import { NgxUiLoaderModule, NgxUiLoaderConfig } from 'ngx-ui-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SeparadorComponent } from './separador/separador.component';
import { MHomeComponent } from './m-home/m-home.component';
import { IconesComponent } from './secondary-components/icones/icones.component';
import { PublicationsComponent } from './secondary-components/publications/publications.component';
import { TechnologiesComponent } from './secondary-components/technologies/technologies.component';
import { RecommendationsComponent } from './secondary-components/recommendations/recommendations.component';
import { NotFoundComponent } from './secondary-components/not-found/not-found.component';
import { NavbarComponent } from './secondary-components/navbar/navbar.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ProjectDetailComponent } from './secondary-components/project-detail/project-detail.component';
import { DisableWhenOfflineDirective } from './services/disable-when-offline.directive';
import { CookieService } from 'ngx-cookie-service';
import { OfflineModalComponent } from './secondary-components/offline-modal/offline-modal.component';
import { PrivacyPolicyComponent } from './secondary-components/privacy-policy/privacy-policy.component';
import { FooterComponent } from './secondary-components/footer/footer.component';
import { ScrollService } from './services/scroll.service';
import { BooksComponent } from './secondary-components/books/books.component';

export const httpLoaderFactory = (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json');
const ngxLoaderUiConfig: NgxUiLoaderConfig = {
  bgsColor: '#e69c24',
  bgsOpacity: 0.5,
  bgsPosition: 'bottom-right',
  bgsSize: 60,
  bgsType: 'ball-spin-clockwise',
  blur: 11,
  delay: 0,
  fastFadeOut: true,
  fgsColor: '#e69c24',
  fgsPosition: 'center-center',
  fgsSize: 50,
  fgsType: 'three-bounce',
  gap: 24,
  logoPosition: 'center-center',
  logoSize: 120,
  logoUrl: '',
  masterLoaderId: 'master',
  overlayBorderRadius: '0',
  overlayColor: 'rgba(100, 100, 100, 0.9)',
  pbColor: 'red',
  pbDirection: 'ltr',
  pbThickness: 3,
  hasProgressBar: false,
  text: '',
  textColor: '#FFFFFF',
  textPosition: 'center-center',
  maxTime: -1,
  minTime: 300
};

@NgModule({
  declarations: [
    DisableWhenOfflineDirective,
    AppComponent,
    HomeComponent,
    SeparadorComponent,
    MHomeComponent,
    IconesComponent,
    OfflineModalComponent,
    PublicationsComponent,
    TechnologiesComponent,
    RecommendationsComponent,
    NotFoundComponent,
    NavbarComponent,
    PortfolioComponent,
    ProjectDetailComponent,
    PrivacyPolicyComponent,
    FooterComponent,
    BooksComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    NgxUiLoaderModule.forRoot(ngxLoaderUiConfig),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FontAwesomeModule,
    AppRoutingModule
  ],
  providers: [CookieService, provideHttpClient(withInterceptorsFromDi()), ScrollService]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab);
  }
}
