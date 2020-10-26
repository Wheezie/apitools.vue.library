import IValidator from './validation/IValidator';
import IValidationError from './validation/IValidationError';

export default interface IField {
    value: string,
    valid: boolean,
    validators: IValidator[],
    errors: IValidationError[]
};
