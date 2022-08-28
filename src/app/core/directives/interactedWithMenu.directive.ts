import { AfterViewInit, Directive, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({ selector: '[interacted-with-menu]' })
export class InteractedWithMenu implements AfterViewInit {
    @Output('interacted') interacted = new EventEmitter<void>();

    private INTERACTIVE_ELEMENTS: Array<HTMLElement> = [];
    
    constructor(private el: ElementRef) { }

    public ngAfterViewInit() {
        this.INTERACTIVE_ELEMENTS = this.el.nativeElement.querySelector('ol').children;

        if(this.INTERACTIVE_ELEMENTS.length > 0) {
            for (const el of this.INTERACTIVE_ELEMENTS) {
                el.addEventListener('click', (e: any) => {
                    const CLICKED = e.target.nodeName;
                    const PARENT = e.target.parentElement.nodeName;

                    if(CLICKED === "LI" || CLICKED === "option" || CLICKED === "I" || (CLICKED || PARENT === "BUTTON")) {
                        this.interacted.emit();
                    }
                });
            }
        }
    }
}
