import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import materialImports from './material-imports';
import directives from 'src/app/core/directives/_directives';



@NgModule({
  declarations: [
    directives
  ],
  imports: [
    CommonModule,
    materialImports
  ],
  exports: [
    materialImports,
    directives
  ]
})
export class SharedModule { }
