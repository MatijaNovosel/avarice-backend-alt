import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class TransferInput {
  @Field()
  @IsNotEmpty()
  accountFromId: string;
  @Field()
  @IsNotEmpty()
  accountToId: string;
  @Field()
  @IsNotEmpty()
  amount: number;
}
