import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class DeleteTransactionInput {
  @Field()
  @IsNotEmpty()
  id: string;
}
