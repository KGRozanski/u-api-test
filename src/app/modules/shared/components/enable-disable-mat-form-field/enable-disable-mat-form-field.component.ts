import { Component, HostListener, Input, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AccountInfoComponent } from 'src/app/modules/user/components/account-info/account-info.component';

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

  public get value(): string {
    return this._value;
  }

  public set value(value: string) {
    this._value = value;
  }

  constructor(private viewContainerRef: ViewContainerRef) {}

  @Input() name: string;

  @HostListener("document:keydown.enter", ["$event"]) onKeydownHandler($event: any) {
    $event.target.blur();
    this.setDisabledState!(true);
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

  toggleButton(isDisabled: boolean): void {
    this.disableAll();
    this.setDisabledState!(isDisabled);
  }
  
  disableAll() {
    this.viewContainerRef.injector.get(AccountInfoComponent).personalDetailsForm.disable();
  }

}
