import { Module } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';
import { PrismaService } from 'src/prisma.service';
import { CustomerResolver } from './customer.resolver';
import { AuthModule } from 'src/auth/auth.module';
import { CustomerService } from './customer.service';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [
    CustomerRepository,
    PrismaService,
    CustomerResolver,
    CustomerService,
  ],
})
export class CustomerModule {}
