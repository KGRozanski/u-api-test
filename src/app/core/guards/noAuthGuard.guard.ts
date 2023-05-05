import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class NoAuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(): boolean {
		if (!this.authService.isAuthenticated) {
			return true;
		} else {
			this.router.navigate(['']);
			return false;
		}
	}
}
