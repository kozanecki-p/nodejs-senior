import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/auth.input';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LoginInput) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  signUp(@Body() signInDto: LoginInput) {
    return this.authService.singUp(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Get('verify/:VERIFICATION_CODE')
  verify(@Param('VERIFICATION_CODE') verificationCode: string) {
    return this.authService.verifyAccount(verificationCode);
  }
}
