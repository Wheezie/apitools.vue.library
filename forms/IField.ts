import IValidator from './validation/IValidator';

export default interface IField {
    value: string,
    valid: boolean,
    validators: IValidator[]
};
