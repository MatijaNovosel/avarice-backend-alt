import { Field, ObjectType } from "@nestjs/graphql";
import { Account } from "src/accounts/models/account.model";
import { BaseModel } from "src/common/models/base.model";

@ObjectType()
export class Template extends BaseModel {
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
}
