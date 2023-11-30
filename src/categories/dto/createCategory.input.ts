import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateCategoryInput {
  @Field()
  name: string;
  @Field()
  icon: string;
  @Field()
  color: string;
  @Field({ nullable: true })
  parentId?: string;
}
