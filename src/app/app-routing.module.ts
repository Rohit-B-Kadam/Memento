
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimelineComponent } from './components/organisation/timeline/timeline.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { DuplicateComponent } from './components/features/duplicate/duplicate.component';
import { EventGalleryComponent } from './components/organisation/timeline/event-gallery/event-gallery.component';
import { PhotoViewerComponent } from './components/organisation/timeline/photo-viewer/photo-viewer.component';
import { CreateEventComponent } from './components/organisation/timeline/create-event/create-event.component';
import { FourZeroFourPageComponent } from './components/four-zero-four-page/four-zero-four-page.component';
import { RegistrationComponent } from './components/authentication/registration/registration.component';
import { ReDirectToLatestEventComponent } from './components/organisation/timeline/re-direct-to-latest-event/re-direct-to-latest-event.component';
import { FriendListComponent } from './components/features/friend-list/friend-list.component';
import { AddFriendComponent } from './components/features/friend-list/add-friend/add-friend.component';
import { FaceDetectComponent } from './face-detect/face-detect.component';
import { EditEventComponent } from './components/organisation/timeline/edit-event/edit-event.component';

const routes: Routes = [
    {
        path: 'timeline',
        children: [
            {
                path: 'event-gallery',
                children: 
                [
                    {
                        path: ':id', component: EventGalleryComponent
                    },
                    {
                        path: '**', component: FourZeroFourPageComponent
                    }
                ]

            },
            {
                path: 'photo-viewer',
                children: 
                [
                    {
                        path: ':id', component: PhotoViewerComponent
                    },
                    {
                        path: '**', component: FourZeroFourPageComponent
                    }
                ]
            },
            {
                path: 'create-event', component: CreateEventComponent
            },
            {
                path: 'edit-event',
                children: 
                [
                    {
                        path: ':id', component: EditEventComponent
                    },
                    {
                        path: '**', component: FourZeroFourPageComponent
                    }
                ]
            },
            {
                path: ':id', component: TimelineComponent
            },
            {
                path: '', component: ReDirectToLatestEventComponent
            },       
        ]
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'registration' , component: RegistrationComponent
    },
    {
        path: 'duplicate', component: DuplicateComponent
    },
    {
        path: 'friend-list', component: FriendListComponent
    },
    {
        path: 'add-friend', component: AddFriendComponent
    },
    {
        path: 'face-detect', component: FaceDetectComponent
    },
    { 
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: '**', //  <-- wild-card  
        component: FourZeroFourPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
