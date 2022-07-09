import { TokenType } from "../enums/token-type.enum";

export interface JWT {
    username: string;
    givenName: string;
    familyName: string;
    photo: string;
    creationDate: number;
    sub: number;
    iat?: number;
    iss: string;
    exp?: number;
    aud: string;
    typ: TokenType;
    emailVerified?: boolean;
    resetPassword?: boolean;
}
