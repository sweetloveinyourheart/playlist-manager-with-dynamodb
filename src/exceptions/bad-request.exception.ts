import { Exception } from "./global.exception";

export class BadRequestException extends Exception {
    constructor(message?: string) {
        super(message);
        this.statusCode = 400;
    }
}