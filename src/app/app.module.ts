import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
// import { AngularFontAwesomeModule } from 'angular-font-awesome';

// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SeparadorComponent } from './separador/separador.component';
import { MHomeComponent } from './m-home/m-home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconesComponent } from './secondary-components/icones/icones.component';
import { PublicationsComponent } from './secondary-components/publications/publications.component';
import { TechnologiesComponent } from './secondary-components/technologies/technologies.component';
import { RecommendationsComponent } from './secondary-components/recommendations/recommendations.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SeparadorComponent,
    MHomeComponent,
    IconesComponent,
    PublicationsComponent,
    TechnologiesComponent,
    RecommendationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // AngularFontAwesomeModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    HammerModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
