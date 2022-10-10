export class RegexSupplier {
    static get onlyLettersWord_PL(): RegExp {
        return new RegExp(/^([A-Za-zżółćęśąźń]+([ ]?[a-z]?['-]?[A-Z][a-z]+)*)$/);
    }

    static get email(): RegExp {
        return new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    }

    static get password(): RegExp {
        return new RegExp(/(?=^.{12,64}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/);
    }

    static get username(): RegExp {
        return new RegExp(/^[A-Za-z0-9_]+$/);
    }
}
