import {
  Field,
  HideField,
  ObjectType,
  registerEnumType
} from "@nestjs/graphql";
import { Role } from "@prisma/client";
import { IsEmail } from "class-validator";
import "reflect-metadata";
import { Account } from "../../accounts/models/account.model";
import { Category } from "../../categories/models/category.model";
import { BaseModel } from "../../common/models/base.model";
import { Transaction } from "../../transactions/models/transaction.model";

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
  @Field(() => [Transaction], { nullable: true })
  transactions?: [Transaction] | null;
  @Field(() => [Account], { nullable: true })
  accounts?: [Account] | null;
  @Field(() => [Category], { nullable: true })
  categories?: [Category] | null;
  @HideField()
  password: string;
}
