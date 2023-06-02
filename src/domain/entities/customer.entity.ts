import { Field, ObjectType } from '@nestjs/graphql';
import { Base } from 'domain/entities/base.entity';

@ObjectType()
export class Customer extends Base {
  @Field(() => String)
  email: string;
}
