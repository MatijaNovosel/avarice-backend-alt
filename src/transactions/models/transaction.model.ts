import { Field, ObjectType } from "@nestjs/graphql";
import { Account } from "../../accounts/models/account.model";
import { Category } from "../../categories/models/category.model";
import { BaseModel } from "../../common/models/base.model";

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
  @Field(() => Account, { nullable: true })
  account?: Account | null;
  @Field(() => Account, { nullable: true })
  transferAccount?: Account | null;
  @Field(() => Category, { nullable: true })
  category?: Category | null;
}
