import { AuthGuard } from "./authGuard.guard";
import { NoAuthGuard } from "./noAuthGuard.guard";

export const GUARD_PROVIDERS = [
    AuthGuard,
    NoAuthGuard
];