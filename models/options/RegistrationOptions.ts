import IStringOptions from './IStringOptions';

import PasswordOptions from './PasswordOptions';
import StringOptions from './StringOptions';

export default class RegistrationOptions {
    public emailRequired: Boolean = true;

    public token: IStringOptions = new StringOptions(false, 6, 6);

    public userName: IStringOptions = new StringOptions(true, 4, 32);
    public firstName: IStringOptions = new StringOptions(true, 2, 32);
    public lastName: IStringOptions = new StringOptions(true, 2, 32);

    public password: IStringOptions = new PasswordOptions(true, 6, 200, true, true);
}