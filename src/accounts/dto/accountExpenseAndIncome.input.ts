import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AccountExpenseAndIncomeInput {
  @Field()
  accountId: string;
  @Field()
  timePeriod: number;
}
