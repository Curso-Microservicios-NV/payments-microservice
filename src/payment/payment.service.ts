import { Injectable } from '@nestjs/common';
import { envs } from 'src/config';
import Stripe from 'stripe';
import { PaymentSessionDto } from './dto/payment-session.dto';
import { Request, Response } from 'express';

@Injectable()
export class PaymentService {

    private readonly stripe = new Stripe(envs.stripeSecret);

    async createPaymentSession(paymentSessionDto: PaymentSessionDto) {

        const { currency, items, orderId } = paymentSessionDto;

        const lineItems = items.map(item => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity
        }));

        const session = await this.stripe.checkout.sessions.create({
            payment_intent_data: {
                metadata: {
                    orderId: orderId
                }
            },
            line_items: lineItems,
            mode: 'payment',
            success_url: envs.stripeSuccessUrl,
            cancel_url: envs.stripeCancelUrl,
        });

        return session;
    }

    async stripeWebhook(req: Request, res: Response) {
        const signature = req.headers['stripe-signature'];

        const endpointSecret = envs.stripeEndpointSecret;

        let event: Stripe.Event;

        try {
            event = this.stripe.webhooks.constructEvent(req['rawBody'], signature!, endpointSecret);
        }
        catch (err) {
            res.status(400).json({
                message: `Webhook error: ${err.message}`
            });
            return;
        }

        switch (event.type) {
            case 'payment_intent.succeeded':
                const chargeSucceded = event.data.object;
                console.log({
                    metadata: chargeSucceded.metadata,
                    orderId: chargeSucceded.metadata.orderId
                });

                break;
            default:
                console.log(`Event ${event.type} not controlled`);
        }

        return res.status(200).json({ signature });
    }
}
