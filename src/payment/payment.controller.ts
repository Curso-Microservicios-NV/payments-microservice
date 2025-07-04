import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentSessionDto } from './dto/payment-session.dto';
import { Request, Response } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';


@Controller('payments')
export class PaymentController {

  constructor(
    private readonly paymentService: PaymentService
  ) { }

  @MessagePattern('create.payment.session')
  createPaymentSession(@Payload() paymentSessionDto: PaymentSessionDto) {
    return this.paymentService.createPaymentSession(paymentSessionDto);
  }

  @Get('success')
  success() {
    return {
      ok: true,
      message: 'Payment successful'
    }
  }

  @Get('cancel')
  cancel() {
    return {
      ok: false,
      message: 'Payment cancelled'
    }
  }

  @Post('webhook')
  async stripeWebhook(@Req() req: Request, @Res() res: Response ) {
    return this.paymentService.stripeWebhook(req, res);
  }

}
