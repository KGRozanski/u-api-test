import { AccountInfo } from "../../interfaces/account-info.interface"

export function getAccountInitial(): AccountInfo {
    return {
        username: '',
        email: '',
        givenName: '',
        familyName: '',
        photo: '',
        creationDate: '',
        role: ''
    }
}
