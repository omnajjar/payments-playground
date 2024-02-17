import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import Stripe from 'stripe';
import { SUBSCRIPTION } from './types';

@Injectable()
export class AppService {
  private readonly stripe: Stripe;

  constructor(private readonly configService: ConfigService) {
    this.stripe = new Stripe(configService.get<string>('STRIPE_SECRET_KEY'), {
      apiVersion: '2023-10-16',
    });
  }

  getHealthCheck(): string {
    return this.configService.get<string>('HEALTH_CHECK_MESSAGE');
  }

  async createSubscription(
    customerEmail: string,
    subscription: SUBSCRIPTION,
  ): Promise<Stripe.Checkout.Session> {
    const priceId = this.loadSubscription()[subscription];

    if (!priceId) {
      throw new BadRequestException('Invalid subscription type');
    }

    if (!customerEmail) {
      throw new BadRequestException('Invalid customer email');
    }

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      customer_email: customerEmail,
      success_url: this.configService.get<string>(
        'SERVICE_PAYMENT_SUCCESS_REDIRECT_URL',
      ),
      cancel_url: this.configService.get<string>(
        'SERVICE_PAYMENT_FAIL_REDIRECT_URL',
      ),
    });

    console.log('Session Checkout created', session, '\n\n');

    return session;
  }

  async handleSuccessfulCheckout(res: Response): Promise<void> {
    const appSuccessPaymentRedirectUrl = this.configService.get<string>(
      'APP_PAYMENT_SUCCESS_REDIRECT_URL',
    );

    console.log('Payment Success');
    console.log('Redirecting to:', appSuccessPaymentRedirectUrl, '\n\n');

    res.redirect(appSuccessPaymentRedirectUrl);
  }

  async handleFailedCheckout(res: Response): Promise<void> {
    const appFailedPaymentRedirectUrl = this.configService.get<string>(
      'APP_PAYMENT_FAIL_REDIRECT_URL',
    );

    console.log('Payment Failed');
    console.log('Redirecting to:', appFailedPaymentRedirectUrl, '\n\n');

    res.redirect(appFailedPaymentRedirectUrl);
  }

  private loadSubscription(): {
    SILVER: string;
    GOLD: string;
    DIAMOND: string;
  } {
    return {
      SILVER: this.configService.get<string>('SILVER_SUBSCRIPTION_PRICE_ID'),
      GOLD: this.configService.get<string>('GOLD_SUBSCRIPTION_PRICE_ID'),
      DIAMOND: this.configService.get<string>('DIAMOND_SUBSCRIPTION_PRICE_ID'),
    };
  }
}
