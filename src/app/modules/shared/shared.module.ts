import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import materialImports from './material-imports';
import directives from 'src/app/core/directives/_directives';
import Pipes from 'src/app/core/pipes/_pipes';
import { EnableDisableMatFormFieldComponent } from './components/enable-disable-mat-form-field/enable-disable-mat-form-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    Pipes,
    directives,
    EnableDisableMatFormFieldComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    materialImports
  ],
  exports: [
    Pipes,
    materialImports,
    directives,
    EnableDisableMatFormFieldComponent
  ]
})
export class SharedModule { }
