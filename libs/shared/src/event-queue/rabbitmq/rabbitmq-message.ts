export interface RabbitMQMessage<T> {
    id: string;
    pattern: string;
    timestamp: Date;
    data: T;
}