export default class ValidationError {
    private _error: string;

    constructor(error: string) {
        this._error = error;
    }

    get message() {
        return this._error;
    }
}