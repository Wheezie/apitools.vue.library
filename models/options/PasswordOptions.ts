import StringOptions from './StringOptions';

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
}