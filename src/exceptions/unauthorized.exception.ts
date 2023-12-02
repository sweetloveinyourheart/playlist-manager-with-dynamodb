import { Exception } from "./global.exception";

export class UnauthorizedException extends Exception {
    constructor(message?: string) {
        super(message);
        this.statusCode = 401;
    }
}