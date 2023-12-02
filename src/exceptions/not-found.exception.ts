import { Exception } from "./global.exception";

export class NotFoundException extends Exception {
    constructor(message?: string) {
        super(message);
        this.statusCode = 404;
    }
}