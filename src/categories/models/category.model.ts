import { Field, ObjectType } from "@nestjs/graphql";
import { BaseModel } from "../../common/models/base.model";
import { Template } from "../../templates/models/template.model";
import { Transaction } from "../../transactions/models/transaction.model";
import { User } from "../../users/models/user.model";

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
  @Field(() => User, { nullable: true })
  user?: User | null;
  @Field(() => Category, { nullable: true })
  parent?: Category | null;
  @Field(() => [Transaction], { nullable: true })
  transactions?: [Transaction] | null;
  @Field(() => [Template], { nullable: true })
  templates?: [Template] | null;
  @Field(() => [Category], { nullable: true })
  children?: [Category] | null;
}
