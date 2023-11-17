import { Module } from "@nestjs/common";
import { AccountsResolver } from "./accounts.resolver";

@Module({
  imports: [],
  providers: [AccountsResolver]
})
export class AccountsModule {}
