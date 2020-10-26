import IValidator from './IValidator';
import ValidationError from './ValidationError';

const NUMBER_REGEX: RegExp = /\d/;
const SPECIAL_CHARACTER: RegExp = /\W|_/;

export default class StringValidator implements IValidator {
    private _minimum: number;
    private _maximum?: number;
    private _specialCharacter: boolean;
    private _number: boolean;
    private _trimSpaces: boolean;

    constructor(min: number, max?: number, specialCharacter: boolean = false, includeNumbers: boolean = false, trimSpaces: boolean = true) {
        this._minimum = min;
        this._maximum = max;
        this._specialCharacter = specialCharacter;
        this._number = includeNumbers;
        this._trimSpaces = trimSpaces;
    }

    get minimum() {
        return this._minimum;
    }

    get maximum() {
        return this._maximum;
    }

    validate(input: string): Array<ValidationError> {
        if (this._trimSpaces) {
            input = input.trim();
        }

        if (input.length == 0) {
            return [];
        }

        const errors = new Array<ValidationError>();
        if (input.length < this._minimum) {
            errors.push(new ValidationError(`Must be at least ${this._minimum} characters long.`));
        } else if (this._maximum && input.length > this._maximum) {
            errors.push(new ValidationError(`May only be ${this._maximum} characters long.`));
        }

        if (this._number && !NUMBER_REGEX.test(input)) {
            errors.push(new ValidationError('Must contain a number.'));
        }

        if (this._specialCharacter && !SPECIAL_CHARACTER.test(input)) {
            errors.push(new ValidationError('Must contain a special character.'));
        }
    
        return errors;
    }
}