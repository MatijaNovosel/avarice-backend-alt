import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { ONE_DAY } from "../utils/constants";
import { sameDate } from "../utils/helpers";
import { TimePeriod } from "./constants/timePeriod";
import { AccountBalanceModel } from "./models/accountBalance.model";
import { AccountExpenseAndIncomeModel } from "./models/accountExpenseAndIncome.model";
import { AccountHistoryModel } from "./models/accountHistory.model";

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  private calculateDaysFromTimePeriod(timePeriod: number) {
    switch (timePeriod) {
      case TimePeriod.SevenDays:
        return 7;
      case TimePeriod.ThirtyDays:
        return 30;
      case TimePeriod.TwelveWeeks:
        return 84;
      case TimePeriod.SixMonths:
        return 180;
      case TimePeriod.OneYear:
        return 365;
      default:
        return -30;
    }
  }

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
        balance:
          account.initialBalance +
          account.transactions.reduce((acc, curr) => curr.amount + acc, 0),
        id: account.id,
        name: account.name,
        currency: account.currency
      });
    }

    return result;
  }

  async getExpenseAndIncomeInTimePeriod(
    id: string,
    timePeriod: number
  ): Promise<AccountExpenseAndIncomeModel> {
    const to = new Date();
    const from = new Date();
    const days = this.calculateDaysFromTimePeriod(timePeriod);
    from.setTime(from.getTime() - ONE_DAY * days);

    const transactions = await this.prisma.transaction.findMany({
      include: { account: true },
      where: {
        accountId: id,
        createdAt: {
          gte: from,
          lte: to
        }
      }
    });

    return {
      expense: transactions
        .filter((t) => t.amount < 0)
        .reduce((acc, curr) => acc + curr.amount * -1, 0),
      income: transactions
        .filter((t) => t.amount > 0)
        .reduce((acc, curr) => acc + curr.amount, 0)
    };
  }

  async getAccountHistory(
    id: string,
    timePeriod: number
  ): Promise<AccountHistoryModel[]> {
    const result: AccountHistoryModel[] = [];
    const account = await this.prisma.account.findFirst({
      include: {
        transactions: true
      },
      where: {
        id
      }
    });
    let accountBalance = account.initialBalance;
    const sum = account.transactions.reduce(
      (acc, curr) => acc + curr.amount,
      0
    );

    accountBalance += sum;

    const days = this.calculateDaysFromTimePeriod(timePeriod);
    const to = new Date();
    const from = new Date();
    from.setTime(from.getTime() - ONE_DAY * days);

    const transactions = account.transactions.filter(
      (t) => t.createdAt >= from && t.createdAt <= to
    );

    if (transactions.length != 0) {
      let currAmount = accountBalance;

      result.push({
        amount: currAmount,
        date: new Date()
      });

      const transactionsNow = transactions.filter((t) =>
        sameDate(t.createdAt, new Date())
      );

      if (transactionsNow.length != 0) {
        for (const t of transactionsNow) {
          if (t.amount < 0) {
            currAmount += t.amount * -1;
          } else {
            currAmount -= t.amount;
          }
        }
      }
      for (let i = 1; i <= days; i++) {
        const date = new Date();
        date.setTime(date.getTime() - ONE_DAY * (i - 1));

        const transactionsAtDate = transactions.filter((t) =>
          sameDate(t.createdAt, date)
        );

        if (transactionsAtDate.length != 0) {
          for (const t of transactionsAtDate) {
            if (t.amount < 0) {
              currAmount += t.amount * -1;
            } else {
              currAmount -= t.amount;
            }
          }
        }

        result.push({
          amount: currAmount,
          date
        });
      }
    } else {
      for (let i = 1; i <= days; i++) {
        const date = new Date();
        date.setTime(date.getTime() - ONE_DAY * (i - 1));
        result.push({
          amount: accountBalance,
          date
        });
      }
    }

    return result;
  }
}
