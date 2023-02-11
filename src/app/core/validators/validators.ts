import { AbstractControl } from '@angular/forms';

export class CustomValidators {
    static passwordEquality(AC: AbstractControl): void {
        const password = AC.get('password')?.value;
        const confirmPassword = AC.get('passwordConfirm')?.value;

        if (password !== confirmPassword) {
            AC.get('passwordConfirm')?.setErrors({ MatchPassword: true });
        }
    }
}
