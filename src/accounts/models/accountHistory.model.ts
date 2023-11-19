import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AccountHistoryModel {
  @Field()
  date: Date;
  @Field()
  amount: number;
}
