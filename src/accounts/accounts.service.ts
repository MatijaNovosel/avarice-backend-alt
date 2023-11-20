import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { ONE_DAY } from "../utils/constants";
import { sameDate } from "../utils/helpers";
import { TimePeriod } from "./constants/timePeriod";
import { AccountBalanceModel } from "./models/accountBalance.model";
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
    const toPeriod = new Date();
    const fromPeriod = new Date();
    fromPeriod.setTime(fromPeriod.getTime() - ONE_DAY * days); // Subtract N days from current date

    const transactions = account.transactions.filter(
      (t) => t.createdAt >= fromPeriod && t.createdAt <= toPeriod
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
