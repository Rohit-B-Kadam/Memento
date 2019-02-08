import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// Material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Shared Module
import { AngularMaterialModule } from './shared-module/angular-material/angular-material.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Service
import { ElectronService } from './providers/electron.service';

// Directive
import { WebviewDirective } from './directives/webview.directive';

// Component
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    AngularMaterialModule
  ],
  providers: [ElectronService],
  bootstrap: [AppComponent]
})
export class AppModule { }
