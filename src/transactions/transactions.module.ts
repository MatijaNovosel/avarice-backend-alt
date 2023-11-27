import { Module } from "@nestjs/common";
import { TransactionsResolver } from "./transactions.resolver";
import { TransactionsService } from "./transactions.service";

@Module({
  imports: [],
  providers: [TransactionsResolver, TransactionsService]
})
export class TransactionsModule {}
