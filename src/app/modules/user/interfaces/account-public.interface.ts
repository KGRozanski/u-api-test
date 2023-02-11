export default interface AccountPublic {
    id: number;
    username: string;
    email: string;
    creationDate: number;
    lastLogin: number;
    givenName: string;
    familyName: string;
    photo: string;
    role: string;
}
