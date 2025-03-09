import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-response',
    templateUrl: './response.component.html',
    styleUrls: ['./response.component.scss'],
    standalone: false
})
export class ResponseComponent implements OnInit, OnDestroy {
	public activationMsg: string;

	private $routeSubscription: Subscription;

	constructor(private route: ActivatedRoute) {}

	ngOnInit(): void {
		this.$routeSubscription = this.route.queryParams.subscribe((params) => {
			this.activationMsg = atob(params['res']);
		});
	}

	ngOnDestroy(): void {
		this.$routeSubscription.unsubscribe();
	}
}
