
export class DomainException extends Error {
    
    __proto__ = Error

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, DomainException.prototype);
    }

}