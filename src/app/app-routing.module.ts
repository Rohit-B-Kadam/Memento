
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimelineComponent } from './components/organisation/timeline/timeline.component';
import { DocumentsComponent } from './components/organisation/documents/documents.component';
import { OtherPhotosComponent } from './components/organisation/other-photos/other-photos.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { DuplicateComponent } from './components/features/duplicate/duplicate.component';
import { PeopleListComponent } from './components/features/people-list/people-list.component';
import { ProfileComponent } from './components/features/profile/profile.component';
import { EventGalleryComponent } from './components/organisation/timeline/event-gallery/event-gallery.component';
import { PhotoViewerComponent } from './components/organisation/timeline/photo-viewer/photo-viewer.component';
import { CreateEventComponent } from './components/organisation/timeline/create-event/create-event.component';

const routes: Routes = [
    {
         path: 'timeline', component: TimelineComponent
    },
    {
        path: 'document', component: DocumentsComponent
    },
    {
        path: 'other-photos', component: OtherPhotosComponent
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'duplicate', component: DuplicateComponent
    },
    {
        path: 'people-list', component: PeopleListComponent
    },
    {
        path: 'profile', component: ProfileComponent
    },
    {
        path: 'event-gallery', component: EventGalleryComponent
    },
    {
        path: 'photo-viewer', component: PhotoViewerComponent
    },
    {
        path: 'create-event', component: CreateEventComponent
    },
    { 
        path: '',
        redirectTo: '/timeline',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
