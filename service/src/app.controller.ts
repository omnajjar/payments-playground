import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { SUBSCRIPTION } from './types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealthCheck(): string {
    return this.appService.getHealthCheck();
  }

  @Post('create_subscription')
  async createSubscription(
    @Body()
    body: {
      email: string;
      subscription: SUBSCRIPTION;
    },
  ): Promise<any> {
    return this.appService.createSubscription(body.email, body.subscription);
  }

  @Get('payment_success')
  async getSuccessfulPayment(@Res() res: Response): Promise<void> {
    this.appService.handleSuccessfulCheckout(res);
  }

  @Get('payment_fail')
  async getFailedPayment(@Res() res: Response): Promise<void> {
    this.appService.handleSuccessfulCheckout(res);
  }
}
