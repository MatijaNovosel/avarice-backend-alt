import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class EditTransactionInput {
  @Field()
  @IsNotEmpty()
  id: string;
  @Field()
  @IsNotEmpty()
  description: string;
  @Field()
  @IsNotEmpty()
  amount: number;
  @Field()
  @IsNotEmpty()
  categoryId: string;
}
