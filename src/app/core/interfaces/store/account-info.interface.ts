import { Role } from 'src/app/modules/user/enums/roles.enum';

export interface AccountInfo {
    sub: string;
    username: string;
    email: string;
    givenName: string;
    familyName: string;
    photo: string;
    creationDate: string;
    role: Role | '';
}
