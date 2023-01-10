import { UniqueEntityID } from "./UniqueEntityID";

export abstract class DomainEvent<T> {

    public readonly ID: UniqueEntityID
    public readonly timestamp: Date;

    abstract get name(): string;

    constructor(public readonly data: T) { 
        this.ID = new UniqueEntityID()
        this.timestamp = new Date()
    }

}