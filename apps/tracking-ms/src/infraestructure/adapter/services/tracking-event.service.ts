import { Injectable, Logger } from "@nestjs/common";
import { DomainEvent } from "@app/domain/shared/seedwork/DomainEvent";
import { DomainEventBus } from "@app/domain/shared/seedwork/port/DomainEventBus";
import { RabbitMQClientService } from "../../../../../../libs/shared/src/event-queue/rabbitmq/services/rabbitmq-client.service";

@Injectable()
export class TrackingEventService implements DomainEventBus {
    
    constructor(private readonly rabbitmq: RabbitMQClientService) {}

    async dispatch(events: DomainEvent<any>[]): Promise<void> {
        Logger.log('Events', events)
        events.forEach(event =>this.rabbitmq.emitTo(event.name, event.data))
        
    }

}