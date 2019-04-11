import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule, 
  MatCheckboxModule, 
  MatToolbarModule, 
  MatSidenavModule, 
  MatIconModule, 
  MatListModule,
  MatNativeDateModule
} from '@angular/material';


  import {MatTreeModule} from '@angular/material/tree';
  import { LayoutModule } from '@angular/cdk/layout';
  import { MatMenuModule} from '@angular/material/menu';
  import {MatInputModule} from '@angular/material/input';
  import {MatAutocompleteModule} from '@angular/material/autocomplete';
  import {MatFormFieldModule} from '@angular/material/form-field';
  import {MatGridListModule} from '@angular/material/grid-list';
  import {MatCardModule} from '@angular/material/card';
  import {MatChipsModule} from '@angular/material/chips';
  import {MatTooltipModule} from '@angular/material/tooltip';
  import {MatStepperModule} from '@angular/material/stepper';
  import { MatDatepickerModule } from '@angular/material/datepicker';
  import {MatSelectModule} from '@angular/material/select';
  import {ScrollDispatchModule} from '@angular/cdk/scrolling';
  import {MatDialogModule} from '@angular/material/dialog';

  // FlexLayout
  import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTreeModule,
    MatButtonModule,
    MatCheckboxModule,
    LayoutModule,
    MatMenuModule,
    FlexLayoutModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatGridListModule,
    MatCardModule,
    MatChipsModule,
    MatTooltipModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ScrollDispatchModule,
    MatDialogModule
  ],
  exports:[
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTreeModule,
    MatButtonModule,
    MatCheckboxModule,
    LayoutModule ,
    MatMenuModule,
    FlexLayoutModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatGridListModule,
    MatCardModule,
    MatChipsModule,
    MatTooltipModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ScrollDispatchModule,
    MatDialogModule
  ]
})
export class AngularMaterialModule { }
