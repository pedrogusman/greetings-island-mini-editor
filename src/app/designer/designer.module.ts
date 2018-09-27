import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignerComponent } from './designer/designer.component';

import { StoreModule } from '@ngrx/store';
import * as fromDesigner from './store/designer.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DesignerEffects } from './store/designer.effects';
import { SharedModule } from '../shared/shared';
import { CanvasBoardComponent } from './components/canvas-board/canvas-board.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,

    StoreModule.forFeature('designer', fromDesigner.reducer),
    EffectsModule.forFeature([DesignerEffects])
  ],
  declarations: [
    DesignerComponent,
    CanvasBoardComponent
  ]
})
export class DesignerModule { }
