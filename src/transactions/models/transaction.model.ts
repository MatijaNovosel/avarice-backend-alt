import { Field, ObjectType } from "@nestjs/graphql";
import { Account } from "src/accounts/models/account.model";
import { Category } from "src/categories/models/category.model";
import { BaseModel } from "src/common/models/base.model";

@ObjectType()
export class Transaction extends BaseModel {
  @Field()
  description: string;
  @Field()
  amount: number;
  @Field()
  longitude: number;
  @Field()
  latitude: number;
  @Field(() => Account)
  account: Account;
  @Field(() => Account, { nullable: true })
  transferAccount?: Account | null;
  @Field(() => Category)
  category: Category;
}
