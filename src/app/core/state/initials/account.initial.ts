import { AccountInfo } from '../../interfaces/store/account-info.interface';

export function getAccountInitial(): AccountInfo {
    return {
        sub: '',
        username: '',
        email: '',
        givenName: '',
        familyName: '',
        photo: '',
        creationDate: '',
        role: ''
    };
}
