import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SeparadorComponent } from './separador/separador.component';
import { MHomeComponent } from './m-home/m-home.component';
import { IconesComponent } from './secondary-components/icones/icones.component';
import { PublicationsComponent } from './publications/publications.component';
import { HobbiesComponent } from './secondary-components/hobbies/hobbies.component';
import { RecommendationsComponent } from './secondary-components/recommendations/recommendations.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './secondary-components/not-found/not-found.component';
import { NavbarComponent } from './secondary-components/navbar/navbar.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { NgxUiLoaderConfig, NgxUiLoaderModule } from 'ngx-ui-loader';

export const httpLoaderFactory = (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json');
const ngxLoaderUiConfig: NgxUiLoaderConfig = {
  'bgsColor': '#e69c24',
  'bgsOpacity': 0.5,
  'bgsPosition': 'bottom-right',
  'bgsSize': 60,
  'bgsType': 'ball-spin-clockwise',
  'blur': 11,
  'delay': 0,
  'fastFadeOut': true,
  'fgsColor': '#e69c24',
  'fgsPosition': 'center-center',
  'fgsSize': 50,
  'fgsType': 'three-bounce',
  'gap': 24,
  'logoPosition': 'center-center',
  'logoSize': 120,
  'logoUrl': '',
  'masterLoaderId': 'master',
  'overlayBorderRadius': '0',
  'overlayColor': 'rgba(100, 100, 100, 0.9)',
  'pbColor': 'red',
  'pbDirection': 'ltr',
  'pbThickness': 3,
  'hasProgressBar': false,
  'text': '',
  'textColor': '#FFFFFF',
  'textPosition': 'center-center',
  'maxTime': -1,
  'minTime': 300
};
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SeparadorComponent,
    MHomeComponent,
    IconesComponent,
    PublicationsComponent,
    HobbiesComponent,
    RecommendationsComponent,
    NotFoundComponent,
    NavbarComponent,
    PortfolioComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxLoaderUiConfig),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    HammerModule,
    FontAwesomeModule,
    NgxSkeletonLoaderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab);
  }
}
