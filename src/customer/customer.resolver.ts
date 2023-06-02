import { Args, Query, Resolver } from '@nestjs/graphql';
import { Customer } from 'domain/entities/customer.entity';
import { CustomerRepository } from './customer.repository';
import { GetCustomerInput } from './dto/customer.input';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerRepository: CustomerRepository) {}

  @Query(() => [Customer])
  async customers(@Args('data') { skip, take, where }: GetCustomerInput) {
    return this.customerRepository.findAll({ skip, take, where });
  }
}
