import { Args, Query, Resolver } from '@nestjs/graphql';
import { Customer } from 'domain/entities/customer.entity';
import { CustomerRepository } from './customer.repository';
import { GetCustomerInput } from './dto/customer.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerRepository: CustomerRepository) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [Customer])
  async customers(@Args('data') { skip, take, where }: GetCustomerInput) {
    return this.customerRepository.findAll({ skip, take, where });
  }
}
