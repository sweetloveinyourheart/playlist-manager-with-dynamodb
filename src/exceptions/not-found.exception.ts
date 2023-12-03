import { Exception } from "./global.exception";

export class NotFoundException extends Exception {
    message: string = "Not found";

    constructor(message?: string) {
        super(message);
        this.statusCode = 404;

        if (message) {
            this.message = message;
        }
    }
}