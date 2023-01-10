import { Module } from '@nestjs/common';
import { TrackingModule } from './tracking/tracking.module';
import { EnrollmentModule } from './enrollment/enrollment.module';

@Module({
  imports: [
    TrackingModule,
    EnrollmentModule,
  ]
})
export class ApplicationModule {}
