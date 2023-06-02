import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { Customer } from '@prisma/client';
import { AccountVerificationService } from 'src/notifications/accountVerification.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
    private accountVerificationService: AccountVerificationService,
    private configService: ConfigService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const customer = await this.authRepository.findOneByEmail(email);
    if (customer?.password !== pass || !customer.verified) {
      throw new UnauthorizedException();
    }

    return this.generateCredentials(customer);
  }

  private async generateCredentials(customer: Customer) {
    const regularTokenPayload = {
      sub: customer.id,
      email: customer.email,
      role: customer.role,
    };
    const refreshTokenPayload = {
      email: customer.email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(regularTokenPayload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '1h',
      }),
      this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
        expiresIn: '1d',
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async singUp(email: string, pass: string) {
    const customer = await this.authRepository.findOneByEmail(email);
    if (customer) {
      throw new ConflictException();
    }

    let newCustomer: Customer;
    try {
      newCustomer = await this.authRepository.create(email, pass);
    } catch (err) {
      throw new ConflictException();
    }

    await this.accountVerificationService.sendVerificationEmail(newCustomer);
  }

  async verifyAccount(verificationCode: string) {
    const customer = await this.authRepository.findOneByVerificationCode(
      verificationCode,
    );

    if (!customer) {
      throw new UnauthorizedException();
    }

    await this.authRepository.setOneAsVerified(customer.id);
  }
}
