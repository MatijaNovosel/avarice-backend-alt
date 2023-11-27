import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { ONE_DAY, WEEKDAY_LABEL } from "../utils/constants";
import { sameDate, weekNumber } from "../utils/helpers";
import { TransactionHeatmapModel } from "./models/transactionHeatmap.model";

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async getHeatmap(userId: string): Promise<TransactionHeatmapModel[]> {
    const result: TransactionHeatmapModel[] = [];

    const transactions = await this.prisma.transaction.findMany({
      include: { account: true },
      where: {
        account: {
          userId
        }
      }
    });

    const from = new Date();
    from.setTime(from.getTime() - ONE_DAY * 30);

    for (let i = 0; i < 30; i++) {
      const date = new Date(from.getTime());
      date.setTime(date.getTime() + ONE_DAY * i);
      const transactionsAtDate = transactions.filter((t) =>
        sameDate(t.createdAt, date)
      );
      result.push({
        date,
        value: transactionsAtDate.length,
        week: weekNumber(date),
        weekDay: WEEKDAY_LABEL[date.getDay()]
      });
    }

    return result;
  }
}
