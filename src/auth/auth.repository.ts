import { Injectable } from '@nestjs/common';
import { Customer } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}

  async findOneByEmail(email: string): Promise<Customer | null> {
    const customer = await this.prisma.customer.findUnique({
      where: { email },
    });

    return customer ? customer : null;
  }

  async create(email: string, password: string): Promise<Customer> {
    const customer = await this.prisma.customer.create({
      data: {
        email,
        password,
      },
    });
    return customer;
  }
}
