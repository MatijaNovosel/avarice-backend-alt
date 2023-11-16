import { Field, ObjectType } from "@nestjs/graphql";
import { BaseModel } from "src/common/models/base.model";
import { Template } from "src/templates/models/template.model";
import { Transaction } from "src/transactions/models/transaction.model";
import { User } from "src/users/models/user.model";

@ObjectType()
export class Account extends BaseModel {
  @Field()
  name: string;
  @Field()
  initialBalance: number;
  @Field()
  currency: string;
  @Field()
  latitude: number;
  @Field(() => User)
  user: User;
  @Field(() => [Transaction])
  posts: [Transaction];
  @Field(() => [Template])
  templates: [Template];
}
