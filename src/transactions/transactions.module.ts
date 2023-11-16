import { Module } from "@nestjs/common";
import { TransactionsResolver } from "./transactions.resolver";

@Module({
  imports: [],
  providers: [TransactionsResolver]
})
export class TransactionsModule {}
