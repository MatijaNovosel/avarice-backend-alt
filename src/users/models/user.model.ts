import {
  Field,
  HideField,
  ObjectType,
  registerEnumType
} from "@nestjs/graphql";
import { Role } from "@prisma/client";
import { IsEmail } from "class-validator";
import "reflect-metadata";
import { Account } from "src/accounts/models/account.model";
import { Category } from "src/categories/models/category.model";
import { BaseModel } from "src/common/models/base.model";
import { Transaction } from "src/transactions/models/transaction.model";

registerEnumType(Role, {
  name: "Role",
  description: "User role"
});

@ObjectType()
export class User extends BaseModel {
  @Field()
  @IsEmail()
  email: string;
  @Field(() => String, { nullable: true })
  firstName?: string;
  @Field(() => String, { nullable: true })
  lastName?: string;
  @Field(() => String)
  username: string;
  @Field(() => Role)
  role: Role;
  @Field(() => [Transaction])
  transactions: [Transaction];
  @Field(() => [Account])
  accounts: [Account];
  @Field(() => [Category])
  categories: [Category];
  @HideField()
  password: string;
}
