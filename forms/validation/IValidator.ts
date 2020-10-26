import IValidationError from './IValidationError';

export default interface IValidator {
    validate(input: string | any): IValidationError[];
}