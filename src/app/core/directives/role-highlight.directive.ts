import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { Role } from 'src/app/modules/user/enums/roles.enum';

@Directive({
    selector: '[appRoleHighlight]',
    standalone: false
})
export class RoleHighlightDirective implements AfterViewInit {
	constructor(private element: ElementRef) {}

	ngAfterViewInit(): void {
		if (this.element.nativeElement.innerText === Role.ADMIN) {
			this.element.nativeElement.style.color = 'red';
		} else if (this.element.nativeElement.innerText === Role.MODERATOR) {
			this.element.nativeElement.style.color = 'yellow';
		}
	}
}
