import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AccountVerificationService } from './accountVerification.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'mail.smtpbucket.com',
        port: 8025,
        secure: false, // upgrade later with STARTTLS
        auth: null,
      },
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: process.cwd() + '/dist/src/notifications/templates/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [AccountVerificationService],
  exports: [AccountVerificationService],
})
export class NotificationsModule {}
