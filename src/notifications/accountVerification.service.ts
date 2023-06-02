import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Customer } from '@prisma/client';

@Injectable()
export class AccountVerificationService {
  constructor(private readonly mailerService: MailerService) {}

  async sendVerificationEmail(customer: Customer) {
    await this.mailerService.sendMail({
      to: customer.email,
      from: 'noreply@nestjs.com',
      subject: 'Account verification',
      template: 'accountVerification',
      context: {
        verificationCode: customer.verificationCode,
        url: 'http://localhost:8080/auth/verify/',
      },
    });
  }
}
