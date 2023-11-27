import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class Pagination {
  @Field(() => Number)
  skip: number;
  @Field(() => Number)
  take: number;
}
