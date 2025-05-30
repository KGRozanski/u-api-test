import { Injectable } from '@angular/core';
import { environment as env } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiLinksService {
	public get apiLink(): string {
		return env.api_protocol + '://' + env.api_origin + ':' + env.api_port + '/' + 'api/';
	}

	public get wsLink(): string {
		return env.api_protocol + '://' + env.api_origin + ':' + env.api_port;
	}
}
