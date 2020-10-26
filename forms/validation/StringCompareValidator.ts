import { Ref } from 'vue';

import IValidationError from './IValidationError';
import IValidator from './IValidator';
import ValidationError from './ValidationError';

export default class StringCompareValidator implements IValidator {
    private _stringToCompare: Ref<string>;
    private _compareName: string;

    constructor(toCompare: Ref<string>, compareName: string) {
        this._stringToCompare = toCompare;
        this._compareName = compareName;
    }


    validate(input: any): IValidationError[] {
        if (this._stringToCompare !== input) {
            return [ new ValidationError(`Isn't equal to ${this._compareName}`) ];
        }

        return [];
    }

}