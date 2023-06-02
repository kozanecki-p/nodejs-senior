import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { Customer } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const customer = await this.authRepository.findOneByEmail(email);
    if (customer?.password !== pass) {
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
        secret: 'token_secret',
        expiresIn: '1h',
      }),
      this.jwtService.signAsync(refreshTokenPayload, {
        secret: 'refresh_token_secret',
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

    console.log(newCustomer);
  }
}
