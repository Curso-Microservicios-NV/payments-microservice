import { Module } from '@nestjs/common';
import { PaymentModule } from './payment/payment.module';
import { HealthCheckModule } from './health-check/health-check.module';


@Module({
  imports: [
    PaymentModule,
    HealthCheckModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
