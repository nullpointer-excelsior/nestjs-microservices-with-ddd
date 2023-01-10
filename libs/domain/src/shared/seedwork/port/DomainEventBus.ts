import { DomainEvent } from "../DomainEvent";

export interface DomainEventBus {
    
    dispatch(event: DomainEvent<any>[]): Promise<void>;

}