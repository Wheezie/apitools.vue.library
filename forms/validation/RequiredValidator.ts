import IValidationError from './IValidationError';
import IValidator from './IValidator';
import ValidationError from './ValidationError';

export default class RequiredValidator implements IValidator {
    validate(input: any): IValidationError[] {
        if (input === null
            || ((typeof input === 'string' || input instanceof String) && input.length <= 0)) {
            return [ new ValidationError('Is required.') ];
        }

        return [];
    }
}