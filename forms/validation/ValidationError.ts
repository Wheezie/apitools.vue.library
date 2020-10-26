import IValidationError from './IValidationError';

export default class ValidationError implements IValidationError {
    private _error: string;

    constructor(error: string) {
        this._error = error;
    }

    get message() {
        return this._error;
    }
}