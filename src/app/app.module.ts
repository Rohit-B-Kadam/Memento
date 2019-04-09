import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder } from '@angular/forms';

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



// Reactive form
import { ReactiveFormsModule } from '@angular/forms';

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
import { EventListComponent } from './components/organisation/timeline/event-list/event-list.component';
import { EventGalleryComponent } from './components/organisation/timeline/event-gallery/event-gallery.component';
import { LayoutModule } from '@angular/cdk/layout';
import { PhotoViewerComponent } from './components/organisation/timeline/photo-viewer/photo-viewer.component';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';
import { SearchEventComponent } from './components/organisation/timeline/search-event/search-event.component';
import { CreateEventComponent } from './components/organisation/timeline/create-event/create-event.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FourZeroFourPageComponent } from './components/four-zero-four-page/four-zero-four-page.component';
import { SlideShowComponent } from './components/features/slide-show/slide-show.component';
import { AdvanceSearchComponent } from './components/features/advance-search/advance-search.component';
import { PhotoThambnailComponent } from './components/organisation/timeline/photo-thambnail/photo-thambnail.component';
import { ReDirectToLatestEventComponent } from './components/organisation/timeline/re-direct-to-latest-event/re-direct-to-latest-event.component';
import { FriendListComponent } from './components/features/friend-list/friend-list.component';
import { AddFriendComponent } from './components/features/friend-list/add-friend/add-friend.component';
import { FaceRecognitionService } from './providers/face-recognition.service';
import { FaceDetectComponent } from './face-detect/face-detect.component';
import { EditEventComponent } from './components/organisation/timeline/edit-event/edit-event.component';
import { FileDropDirective } from './directives/file-drop.directive';

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
    EventListComponent,
    EventGalleryComponent,
    PhotoViewerComponent,
    MainLayoutComponent,
    SearchEventComponent,
    CreateEventComponent,
    FourZeroFourPageComponent,
    SlideShowComponent,
    AdvanceSearchComponent,
    PhotoThambnailComponent,
    ReDirectToLatestEventComponent,
    FriendListComponent,
    AddFriendComponent,
    FaceDetectComponent,
    EditEventComponent,
    FileDropDirective
    
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
    AngularMaterialModule,
    ReactiveFormsModule,
    DragDropModule,
    LayoutModule
  ],
  providers: [ElectronService,
              FormBuilder,
              FaceRecognitionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
