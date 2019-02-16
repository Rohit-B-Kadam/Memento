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
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { TimelineComponent } from './components/organisation/timeline/timeline.component';
import { DocumentsComponent } from './components/organisation/documents/documents.component';
import { OtherPhotosComponent } from './components/organisation/other-photos/other-photos.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegistrationComponent } from './components/authentication/registration/registration.component';
import { DuplicateComponent } from './components/features/duplicate/duplicate.component';
import { PeopleListComponent } from './components/features/people-list/people-list.component';
import { ProfileComponent } from './components/features/profile/profile.component';
import { EventDetailComponent } from './components/organisation/timeline/event-detail/event-detail.component';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    WebviewDirective,
    SidebarComponent,
    TimelineComponent,
    DocumentsComponent,
    OtherPhotosComponent,
    NavbarComponent,
    LoginComponent,
    RegistrationComponent,
    DuplicateComponent,
    PeopleListComponent,
    ProfileComponent,
    EventDetailComponent,
    
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
