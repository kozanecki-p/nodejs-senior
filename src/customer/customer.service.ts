import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';

@Injectable()
export class CustomerService {
  getCustomer(id: string) {
      throw new Error('Method not implemented.');
  }
  constructor(private readonly customerRepository: CustomerRepository) {}
}
