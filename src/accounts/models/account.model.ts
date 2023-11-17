import { Field, ObjectType } from "@nestjs/graphql";
import { Template } from "../../templates/models/template.model";
import { User } from "../../users/models/user.model";
import { Transaction } from "../../transactions/models/transaction.model";
import { BaseModel } from "../../common/models/base.model";

@ObjectType()
export class Account extends BaseModel {
  @Field()
  name: string;
  @Field()
  initialBalance: number;
  @Field()
  currency: string;
  @Field(() => User, { nullable: true })
  user?: User | null;
  @Field(() => [Transaction], { nullable: true })
  transactions?: [Transaction] | null;
  @Field(() => [Transaction], { nullable: true })
  transferTransactions?: [Transaction] | null;
  @Field(() => [Template], { nullable: true })
  templates: [Template] | null;
}
