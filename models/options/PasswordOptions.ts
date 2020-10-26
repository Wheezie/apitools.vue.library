import StringOptions from './StringOptions';

import StringValidator from '../../forms/validation/StringValidator';
import IValidator from '../../forms/validation/IValidator';
import RequiredValidator from '../../forms/validation/RequiredValidator';

export default class PasswordOptions extends StringOptions {
    private _number: boolean;
    private _specialChar: boolean;

    constructor(required: boolean, min: number, max: number, numberRequired: boolean, specialCharacterRequired: boolean) {
        super(required, min, max);

        this._number = numberRequired;
        this._specialChar = specialCharacterRequired;
    }

    get number(): boolean {
        return this._number;
    }

    get specialChar(): boolean {
        return this._specialChar;
    }

    get validators(): IValidator[] {
        const validators: IValidator[] = [
            new StringValidator(this.minimum, this.maximum, this._specialChar, this._number)
        ];

        if (this.required) {
            validators.push(new RequiredValidator());
        }

        return validators;
    }
}