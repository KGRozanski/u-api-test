import { AccountStatus } from "../enums/account-status.enum";
import AccountPublic from "./account-public.interface";

export default interface AccountExtended extends AccountPublic {
    status: AccountStatus;
    googleConnected: boolean;
    removalDate: string;
}
