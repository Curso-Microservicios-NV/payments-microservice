import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports: [NatsModule]
})
export class PaymentModule {}
