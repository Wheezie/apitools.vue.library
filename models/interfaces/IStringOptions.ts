import IValidator from '../../forms/validation/IValidator';

export default interface IStringOptions {
    required: boolean;
    minimum: number;
    maximum: number;

    validators: IValidator[];
};