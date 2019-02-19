import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule, 
  MatCheckboxModule, 
  MatToolbarModule, 
  MatSidenavModule, 
  MatIconModule, 
  MatListModule} from '@angular/material';

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
    MatTooltipModule
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
    MatTooltipModule
  ]
})
export class AngularMaterialModule { }
