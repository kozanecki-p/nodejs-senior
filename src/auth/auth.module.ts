import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './auth.guard';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      global: true,
      // secret: jwtConstants.tokenSecret,
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    NotificationsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, PrismaService, JwtStrategy],
  exports: [],
})
export class AuthModule {}
