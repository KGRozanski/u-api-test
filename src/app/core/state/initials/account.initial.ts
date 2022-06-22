import { UserInfo } from "../../interfaces/user-info.interface"

export function getAccountInitial(): UserInfo {
    return {
        username: '',
        email: '',
        givenName: '',
        familyName: '',
        photo: '',
        creationDate: ''
    }
}
