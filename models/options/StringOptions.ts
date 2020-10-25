import IValidator from '../../forms/validation/IValidator';
import RequiredValidator from '../../forms/validation/RequiredValidator';
import StringValidator from '../../forms/validation/StringValidator';
import IStringOptions from '../interfaces/IStringOptions';

export default class StringOptions implements IStringOptions {
    private _required: boolean;
    private _minimum: number;
    private _maximum: number;

    constructor(required: boolean, min: number, max: number) {
        this._required = required;
        this._minimum = min;
        this._maximum = max;
    }

    get required(): boolean {
        return this._required;
    }

    get minimum(): number {
        return this._minimum;
    }

    get maximum(): number {
        return this._maximum;
    }

    get validators(): Array<IValidator> {
        const validators: Array<IValidator> = [
            new StringValidator(this._minimum, this._maximum)
        ];

        if (this._required) {
            validators.push(new RequiredValidator());
        }

        return validators;
    }
}