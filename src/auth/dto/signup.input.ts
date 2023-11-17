import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

@InputType()
export class SignupInput {
  @Field()
  @MinLength(8)
  username: string;
  @Field()
  @IsEmail()
  email: string;
  @Field()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
  @Field({ nullable: true })
  firstname?: string;
  @Field({ nullable: true })
  lastname?: string;
}
