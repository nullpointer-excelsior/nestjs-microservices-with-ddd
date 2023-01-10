import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RABBITMQ_CLIENT } from './contants';
import { RabbitMQClientService } from './rabbitmq/services/rabbitmq-client.service';

const providersToExport = [
    RabbitMQClientService
]

@Module({
    providers: [
        ...providersToExport
    ],
    imports: [
        ClientsModule.register([
            {
                name: RABBITMQ_CLIENT,
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://localhost:5672'],
                    queue: 'app_queue',
                    queueOptions: {
                        durable: false
                    },
                },
            }
        ])
    ],
    exports: [
        ...providersToExport
    ]
})
export class EventQueueModule { }
