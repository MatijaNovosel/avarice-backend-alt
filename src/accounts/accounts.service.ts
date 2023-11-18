import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { AccountBalanceModel } from "./models/accountBalance.model";

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async getAccountBalances(userId: string): Promise<AccountBalanceModel[]> {
    const result: AccountBalanceModel[] = [];

    const accounts = await this.prisma.account.findMany({
      include: { transactions: true },
      where: {
        userId
      }
    });

    for (const account of accounts) {
      result.push({
        balance: account.transactions.reduce(
          (acc, curr) => curr.amount + acc,
          0
        ),
        id: account.id,
        name: account.name,
        currency: account.currency
      });
    }

    return result;
  }
}
