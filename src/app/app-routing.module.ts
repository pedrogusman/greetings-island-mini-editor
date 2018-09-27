import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DesignerComponent } from './designer/designer/designer.component';

const routes: Routes = [
  { path: '', redirectTo: '/editor', pathMatch: 'full' },
  { path: 'editor', component: DesignerComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
