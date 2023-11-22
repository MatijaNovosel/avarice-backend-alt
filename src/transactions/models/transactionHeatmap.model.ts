import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class TransactionHeatmapModel {
  @Field()
  week: number;
  @Field()
  value: number;
  @Field()
  date: Date;
  @Field()
  weekDay: string;
}
