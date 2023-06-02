import { Module } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';
import { PrismaService } from 'src/prisma.service';
import { CustomerResolver } from './customer.resolver';

@Module({
  imports: [],
  controllers: [],
  providers: [CustomerRepository, PrismaService, CustomerResolver],
})
export class CustomerModule {}
