import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import materialImports from './material-imports';
import directives from 'src/app/core/directives/_directives';
import Pipes from 'src/app/core/pipes/_pipes';



@NgModule({
  declarations: [
    Pipes,
    directives
  ],
  imports: [
    CommonModule,
    materialImports
  ],
  exports: [
    Pipes,
    materialImports,
    directives
  ]
})
export class SharedModule { }
