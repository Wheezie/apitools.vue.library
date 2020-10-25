import ValidationError from './ValidationError';

export default interface IValidator {
    validate(input: string | any): ValidationError[];
}