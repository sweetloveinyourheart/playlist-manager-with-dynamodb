import { Exception } from "./global.exception";

export class BadRequestException extends Exception {
    message: string = "Bad request";

    constructor(message?: string) {
        super(message);
        this.statusCode = 400;

        if (message) {
            this.message = message;
        }
    }
}