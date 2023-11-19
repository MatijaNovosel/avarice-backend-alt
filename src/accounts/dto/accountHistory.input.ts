import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AccountHistoryInput {
  @Field()
  accountId: string;
  @Field()
  timePeriod: number;
}
