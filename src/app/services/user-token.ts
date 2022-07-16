export class UserToken {
    constructor(
        public id: string | undefined,
        public type: string | undefined,
        private _token: string | undefined,
        private _tokenExpirationDate: Date
    ) { }

    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }
}