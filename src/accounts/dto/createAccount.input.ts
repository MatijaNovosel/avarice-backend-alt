import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateAccountInput {
  @Field()
  currency: string;
  @Field()
  name: string;
  @Field()
  initialBalance: number;
}
