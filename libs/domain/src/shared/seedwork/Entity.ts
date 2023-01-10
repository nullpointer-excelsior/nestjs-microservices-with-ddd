import { DomainEvent } from "./DomainEvent";
import { UniqueEntityID } from "./UniqueEntityID";

const isEntity = (v: any): v is Entity<any> => {
    return v instanceof Entity;
};

export type EntityProps<T> = T & { id?: UniqueEntityID } 

export abstract class Entity<T> {

    private id: UniqueEntityID;
    private events: DomainEvent<any>[] = []
    protected state: T;

    constructor(props: EntityProps<T>) {
        this.id = props.id ? props.id : new UniqueEntityID()
        this.state = {
            ...props
        }
    }

    get ID() {
        return this.id
    }

    addEvent(event: DomainEvent<any>) {
        this.events.push(event)
    }

    pullEvents() {
        const domainEvents = this.events.slice();
        this.events = [];
        return domainEvents;
    }

    public equals(object?: Entity<T>): boolean {

        if (object == null || object == undefined) {
            return false;
        }

        if (this === object) {
            return true;
        }

        if (!isEntity(object)) {
            return false;
        }

        return this.id.equals(object.id);

    }

}

