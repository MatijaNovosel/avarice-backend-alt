import { Module } from "@nestjs/common";
import { TemplatesResolver } from "./templates.resolver";

@Module({
  imports: [],
  providers: [TemplatesResolver]
})
export class TemplatesModule {}
