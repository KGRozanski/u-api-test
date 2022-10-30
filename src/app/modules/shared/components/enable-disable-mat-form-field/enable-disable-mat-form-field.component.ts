import { Component, ElementRef, HostListener, Input, SkipSelf } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { CustomErrorStateMatcher } from '../../classes/CustomErrorStateMatcher';
import { FormControlStatus } from '@angular/forms';
import { TogglableFormControl } from 'src/app/modules/user/components/account-info/interfaces/togglableFormControl.interface';

@Component({
  selector: 'app-enable-disable-mat-form-field',
  templateUrl: './enable-disable-mat-form-field.component.html',
  styleUrls: ['./enable-disable-mat-form-field.component.scss']
})
export class EnableDisableMatFormFieldComponent {
  public formCtrl: FormControl & TogglableFormControl;
  public parentForm: FormGroup & {controls: { [key: string]: AbstractControl & TogglableFormControl}};
  public errMatcher = new CustomErrorStateMatcher();

  constructor(@SkipSelf() private el: ElementRef, public formGroupDir: FormGroupDirective) {}
  
  ngOnChanges(): void {
    this.parentForm = this.formGroupDir.form as any;
    this.formCtrl = this.parentForm.get(this.name) as FormControl & TogglableFormControl;
    this.formCtrl.disable();
  }

  // Input name displayed to the user
  @Input() name: string;
  // FormControlName used for matInput directive
  @Input() formControlName: string;

  @HostListener("keydown.enter", ["$event"]) onKeydownHandler($event: any) {
    this.toggleControl();
    this.submit();
  }

  toggleControl(): void {
    if(this.parentForm.status == "INVALID" as FormControlStatus) {return;}

    if(this.formCtrl.enabled) {
      this.submit();
      this.formCtrl.disable();
    } else {
      this.formCtrl.oldValue = this.formCtrl.value;
      this.disableSiblings();
      this.formCtrl.enable();
    }

  }
  
  disableSiblings(): void {
    for (const key in this.parentForm.controls) {
      if(this.parentForm.controls[key].enabled && key !== this.name) {
        this.parentForm.controls[key].reset(this.parentForm.controls[key].oldValue);
      }
      this.parentForm.controls[key].disable();
    }
  }

  submit() {
    if(this.formCtrl.value !== this.formCtrl.oldValue){
      this.el.nativeElement.requestSubmit();
    }
  }

}
