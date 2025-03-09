import { AfterViewInit, Directive, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({
    selector: '[appInteractedWithMenu]',
    standalone: false
})
export class InteractedWithMenuDirective implements AfterViewInit {
	@Output() interacted = new EventEmitter<void>();

	private INTERACTIVE_ELEMENTS: Array<HTMLElement> = [];

	constructor(private el: ElementRef) {}

	public ngAfterViewInit() {
		this.INTERACTIVE_ELEMENTS = this.el.nativeElement.querySelector('ol').children;

		if (this.INTERACTIVE_ELEMENTS.length > 0) {
			for (const el of this.INTERACTIVE_ELEMENTS) {
				el.addEventListener('click', (e: Event) => {
					if (!this.isOptionASwitch(<HTMLElement>e.target)) {
						return;
					} else {
						this.interacted.emit();
					}
				});
			}
		}
	}

	private isOptionASwitch(element: HTMLElement | null): boolean {
		if (!element) {
			return false;
		}

		const clickedElement = element.localName + '.' + element.className;

		if (clickedElement.match(/no-link/) !== null) {
			return false;
		}

		if (element.localName === 'li') {
			return true;
		}

		return this.isOptionASwitch(element.parentElement);
	}
}
