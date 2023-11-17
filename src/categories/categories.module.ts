import { Module } from "@nestjs/common";
import { CategoriesResolver } from "./categories.resolver";

@Module({
  imports: [],
  providers: [CategoriesResolver]
})
export class CategoriesModule {}
