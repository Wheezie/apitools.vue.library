import PasswordOptions from './PasswordOptions';
import StringOptions from './StringOptions';

export default class RegistrationOptions {
    public emailRequired: Boolean = true;
    public userName: StringOptions = new StringOptions(true, 2, 32);
    public firstName: StringOptions = new StringOptions(true, 2, 32);
    public lastName: StringOptions = new StringOptions(true, 2, 32);

    public password: PasswordOptions = new PasswordOptions(true, 6, 200, true, true);
}