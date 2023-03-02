import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortTextPipe } from './pipes/short-text.pipe';

@NgModule( {
  declarations: [
    ShortTextPipe
  ],
  imports: [
    CommonModule,
  ],
    exports: [
        CommonModule,
        ShortTextPipe,
    ],
} )

export class SharedModule {
}
