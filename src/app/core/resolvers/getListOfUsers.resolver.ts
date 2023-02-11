import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/modules/user/services/user.service';
import { HttpResponse } from '@angular/common/http';
import AccountExtended from 'src/app/modules/user/interfaces/account-extended.interface';

@Injectable()
export class GetListOfUsersResolver implements Resolve<Observable<HttpResponse<[AccountExtended[], number]>>> {
    constructor(private US: UserService) {}

    resolve(): Observable<HttpResponse<[AccountExtended[], number]>> {
        return this.US.getListOfUsers(0, 10, 'DESC');
    }
}
