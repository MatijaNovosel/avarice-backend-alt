import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class CreateTransactionInput {
  @Field()
  @IsNotEmpty()
  description: string;
  @Field()
  @IsNotEmpty()
  amount: number;
  @Field()
  @IsNotEmpty()
  latitude: number;
  @Field()
  @IsNotEmpty()
  longitude: number;
  @Field()
  @IsNotEmpty()
  accountId: string;
  @Field()
  @IsNotEmpty()
  categoryId: string;
  @Field()
  @IsNotEmpty()
  saveAsTemplate: boolean;
}
