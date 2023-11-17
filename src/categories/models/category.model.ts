import { Field, ObjectType } from "@nestjs/graphql";
import { BaseModel } from "src/common/models/base.model";
import { Template } from "src/templates/models/template.model";
import { Transaction } from "src/transactions/models/transaction.model";
import { User } from "src/users/models/user.model";

@ObjectType()
export class Category extends BaseModel {
  @Field()
  name: string;
  @Field()
  color: string;
  @Field()
  icon: string;
  @Field()
  system: boolean;
  @Field(() => User)
  user: User;
  @Field(() => Category, { nullable: true })
  parent?: Category | null;
  @Field(() => [Transaction])
  transactions: [Transaction];
  @Field(() => [Template])
  templates: [Template];
  @Field(() => [Category])
  children: [Category];
}
