import AccountExtended from "./account-extended.interface";

export type UpdateAccountDto =  Partial<Pick<AccountExtended, "familyName" | "givenName" | "email">>;
