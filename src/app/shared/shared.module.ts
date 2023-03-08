import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDirective } from './directives/drag.directive';

@NgModule( {
  declarations: [
    DragDirective
  ],
  imports: [
    CommonModule
  ],
    exports: [
        CommonModule,
        DragDirective
    ],
} )

export class SharedModule {
}
