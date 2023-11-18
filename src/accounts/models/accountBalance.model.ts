import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AccountBalanceModel {
  @Field()
  balance: number;
  @Field()
  id: string;
  @Field()
  name: string;
  @Field()
  currency: string;
}
