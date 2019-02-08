
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimelineComponent } from './components/organisation/timeline/timeline.component';
import { DocumentsComponent } from './components/organisation/documents/documents.component';
import { OtherPhotosComponent } from './components/organisation/other-photos/other-photos.component';

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
