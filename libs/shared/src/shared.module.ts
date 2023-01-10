import { Module } from '@nestjs/common';
import { EventQueueModule } from './event-queue/event-queue.module';

@Module({
  imports: [EventQueueModule]
})
export class SharedModule {}
