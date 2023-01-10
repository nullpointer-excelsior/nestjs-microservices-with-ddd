import { Transport } from "@nestjs/microservices";

export const RabbitMqConfig = {
    transport: Transport.RMQ,
    options: {
        urls: ['amqp://localhost:5672'],
        queue: 'cats_queue',
        queueOptions: {
            durable: false
        },
    },
}