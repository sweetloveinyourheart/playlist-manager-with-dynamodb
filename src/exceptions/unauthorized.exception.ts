import { Exception } from "./global.exception";

export class UnauthorizedException extends Exception {
    message: string = "Unauthorized";

    constructor(message?: string) {
        super(message);
        
        this.statusCode = 401;
        if (message) {
            this.message = message;
        }
    }
}