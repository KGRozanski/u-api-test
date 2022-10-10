import { Component, ElementRef, Host, HostListener, Input, Optional, SkipSelf } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomErrorStateMatcher } from '../../classes/CustomErrorStateMatcher';
import { FormControlStatus } from '@angular/forms';

@Component({
  selector: 'app-enable-disable-mat-form-field',
  templateUrl: './enable-disable-mat-form-field.component.html',
  styleUrls: ['./enable-disable-mat-form-field.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: EnableDisableMatFormFieldComponent,
    multi: true
  }]
})
export class EnableDisableMatFormFieldComponent implements ControlValueAccessor {
  private _value: string;
  public isDisabled: boolean = true;
  public container: any;
  public formCtrl: FormControl & {active: boolean};
  public parentForm: FormGroup & {controls: { [key: string]: AbstractControl & {active: boolean}}};
  public errMatcher = new CustomErrorStateMatcher();

  public get value(): string {
    return this._value;
  }

  public set value(value: string) {
    this._value = value;
  }

  constructor(@Optional() @Host() @SkipSelf() private controlContainer: ControlContainer, @SkipSelf() private el: ElementRef) {}
  
  ngOnChanges(): void {
    if(!this.controlContainer.formDirective) { throw new Error("No control container form directive specified");};
    this.container = this.controlContainer as any;
    this.parentForm = this.container.form;
    this.formCtrl = this.parentForm.get(this.formControlName) as FormControl & {active: boolean};
    this.formCtrl.active = false;
  }

  // Input name displayed to the user
  @Input() name: string;
  // FormControlName used for matInput directive
  @Input() formControlName: string;

  @HostListener("keydown.enter", ["$event"]) onKeydownHandler($event: any) {
    $event.target.blur();
    this.toggleControl(false);
    this.submit();
  }

  onChange: (value: string) => void;
  onTouched: (value: string) => void;

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  toggleControl(isActive: boolean): void {
    if(this.parentForm.status == "INVALID" as FormControlStatus) {return;};
    this.disableSiblings();
    this.formCtrl.active = isActive;
    if(!isActive) {
      this.submit();
    }
  }
  
  disableSiblings(): void {
    for (const key in this.parentForm.controls) {
      this.parentForm.controls[key].active = false;
    }
  }

  submit() {
    if(this.formCtrl.dirty){
      this.el.nativeElement.requestSubmit();
    }
  }

}
