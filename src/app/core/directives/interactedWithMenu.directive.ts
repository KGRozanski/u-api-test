import { AfterViewInit, Directive, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({ selector: '[interacted-with-menu]' })
export class InteractedWithMenu implements AfterViewInit {
    @Output('interacted') interacted = new EventEmitter<void>();

    private INTERACTIVE_ELEMENTS: Array<HTMLElement> = [];

    constructor(private el: ElementRef) {}

    public ngAfterViewInit() {
        this.INTERACTIVE_ELEMENTS = this.el.nativeElement.querySelector('ol').children;

        if (this.INTERACTIVE_ELEMENTS.length > 0) {
            for (const el of this.INTERACTIVE_ELEMENTS) {
                el.addEventListener('click', (e: any) => {
                    if (!this.isOptionASwitch(e.target)) {
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

        let clickedElement = element.localName + '.' + element.className;

        if (clickedElement.match(/no-link/) !== null) {
            return false;
        }

        if (element.localName === 'li') {
            return true;
        }

        return this.isOptionASwitch(element.parentElement);
    }
}
