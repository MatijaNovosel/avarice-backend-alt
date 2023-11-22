import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
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

    for (const t of transactions) {
      result.push({
        date: new Date(),
        value: 0,
        week: 0,
        weekDay: ""
      });
    }

    return result;
  }
}
