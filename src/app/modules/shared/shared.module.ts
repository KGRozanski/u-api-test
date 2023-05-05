import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import materialImports from './material-imports';
import directives from 'src/app/core/directives/_directives';
import Pipes from 'src/app/core/pipes/_pipes';
import { EnableDisableMatFormFieldComponent } from './components/enable-disable-mat-form-field/enable-disable-mat-form-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CropImgComponent } from './components/dialogs/crop-img/crop-img.component';
import { HamburgerBtnComponent } from './components/hamburger-btn/hamburger-btn.component';

@NgModule({
	declarations: [Pipes, directives, EnableDisableMatFormFieldComponent, CropImgComponent, HamburgerBtnComponent],
	imports: [CommonModule, FormsModule, ReactiveFormsModule, materialImports, ImageCropperModule],
	exports: [Pipes, materialImports, directives, EnableDisableMatFormFieldComponent, HamburgerBtnComponent],
})
export class SharedModule {}
