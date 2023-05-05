import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalErrorHandlerInterceptor } from './GlobalErrorHandler.interceptor';
import { LoaderInterceptor } from './Loader.interceptor';

export const interceptorsProviders = [
	{
		provide: HTTP_INTERCEPTORS,
		useClass: GlobalErrorHandlerInterceptor,
		multi: true,
	},
];
