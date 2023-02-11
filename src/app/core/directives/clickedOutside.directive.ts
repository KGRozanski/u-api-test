import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, EventEmitter, Inject, OnDestroy, Output } from '@angular/core';
import { filter, fromEvent, Subscription } from 'rxjs';

@Directive({ selector: '[appClickedOutside]' })
export class ClickedOutsideDirective implements AfterViewInit, OnDestroy {
    @Output() clickedOutside = new EventEmitter<void>();
    private documentSubscription: Subscription | undefined;

    constructor(private el: ElementRef, @Inject(DOCUMENT) private document: Document) {}

    public ngAfterViewInit() {
        this.documentSubscription = fromEvent(this.document, 'click')
            .pipe(
                filter((event) => {
                    return !this.isInside(event.target as HTMLElement);
                })
            )
            .subscribe(() => {
                this.clickedOutside.emit();
            });
    }

    public isInside(element: HTMLElement): boolean {
        return element === this.el.nativeElement || this.el.nativeElement.contains(element);
    }

    public ngOnDestroy(): void {
        if (this.documentSubscription) {
            this.documentSubscription.unsubscribe();
        }
    }
}
