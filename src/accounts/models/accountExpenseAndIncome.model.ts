import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AccountExpenseAndIncomeModel {
  @Field()
  expense: number;
  @Field()
  income: number;
}
