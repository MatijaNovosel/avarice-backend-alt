import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";
import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
import { PrismaService } from "nestjs-prisma";
import { GqlAuthGuard } from "../auth/gql-auth.guard";
import { UserEntity } from "../common/decorators/user.decorator";
import { User } from "../users/models/user.model";
import { TransactionIdArgs } from "./args/transaction-id.args";
import { CreateTransactionInput } from "./dto/createTransaction.input";
import { DeleteTransactionInput } from "./dto/deleteTransaction.input";
import { DuplicateTransactionInput } from "./dto/duplicateTransaction.input";
import { EditTransactionInput } from "./dto/editTransaction.input";
import { Pagination } from "./dto/pagination.input";
import { PostOrder } from "./dto/post-order.input";
import { TransferInput } from "./dto/transfer.input";
import { TransactionConnection } from "./models/transaction-connection.model";
import { Transaction } from "./models/transaction.model";
import { TransactionHeatmapModel } from "./models/transactionHeatmap.model";
import { TransactionsService } from "./transactions.service";

const pubSub = new PubSub();

@Resolver(() => Transaction)
@UseGuards(GqlAuthGuard)
export class TransactionsResolver {
  constructor(
    private prisma: PrismaService,
    private transactionService: TransactionsService
  ) {}

  @Subscription(() => Transaction)
  transactionCreated() {
    return pubSub.asyncIterator("transactionCreated");
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async deleteTransaction(@Args("data") { id }: DeleteTransactionInput) {
    await this.prisma.transaction.delete({
      where: {
        id
      }
    });
    return id;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async editTransaction(
    @Args("data") { id, amount, description, categoryId }: EditTransactionInput
  ) {
    await this.prisma.transaction.update({
      where: {
        id
      },
      data: {
        amount,
        description,
        categoryId
      }
    });
    return id;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async duplicateTransaction(@Args("data") { id }: DuplicateTransactionInput) {
    const { accountId, amount, categoryId, description, latitude, longitude } =
      await this.prisma.transaction.findFirst({
        where: {
          id
        }
      });

    const newTransaction = await this.prisma.transaction.create({
      data: {
        accountId,
        amount,
        description,
        latitude,
        longitude,
        categoryId
      }
    });

    return newTransaction.id;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Transaction)
  async createTransaction(
    @Args("data")
    {
      accountId,
      amount,
      description,
      categoryId,
      saveAsTemplate
    }: CreateTransactionInput
  ) {
    const newTransaction = await this.prisma.transaction.create({
      data: {
        accountId,
        amount,
        description,
        latitude: 0,
        longitude: 0,
        categoryId
      }
    });

    if (saveAsTemplate) {
      await this.prisma.template.create({
        data: {
          accountId,
          amount,
          description,
          latitude: 0,
          longitude: 0,
          categoryId
        }
      });
    }

    pubSub.publish("transactionCreated", {
      transactionCreated: newTransaction
    });

    return newTransaction;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => [String])
  async transfer(
    @Args("data") { accountFromId, accountToId, amount }: TransferInput
  ) {
    const accountFrom = await this.prisma.account.findFirst({
      where: {
        id: accountFromId
      }
    });
    const accountTo = await this.prisma.account.findFirst({
      where: {
        id: accountToId
      }
    });
    const description = `Transfer (${accountFrom.name} => ${accountTo.name})`;
    const startRecord = await this.prisma.transaction.create({
      data: {
        accountId: accountFromId,
        amount: amount * -1,
        categoryId: "",
        description,
        transferAccountId: accountToId,
        latitude: 0,
        longitude: 0
      }
    });
    const endRecord = await this.prisma.transaction.create({
      data: {
        accountId: accountToId,
        amount: amount,
        categoryId: "",
        description,
        transferAccountId: accountFromId,
        latitude: 0,
        longitude: 0
      }
    });
    return [startRecord.id, endRecord.id];
  }

  @Query(() => TransactionConnection)
  async getTransactions(
    @UserEntity() user: User,
    @Args({ name: "pagination", type: () => Pagination, nullable: true })
    { skip, take }: Pagination,
    @Args({ name: "query", type: () => String, nullable: true })
    query: string,
    @Args({
      name: "orderBy",
      type: () => PostOrder,
      nullable: true
    })
    orderBy: PostOrder
  ) {
    const transactions = await findManyCursorConnection(
      (args) =>
        this.prisma.transaction.findMany({
          include: { account: true, category: true },
          where: {
            description: { contains: query || "" },
            account: {
              userId: user.id
            }
          },
          skip,
          take,
          orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : undefined,
          ...args
        }),
      () =>
        this.prisma.transaction.count({
          where: {
            description: { contains: query || "" },
            account: {
              userId: user.id
            }
          }
        })
    );
    return transactions;
  }

  @Query(() => Transaction)
  async getTransactionById(@Args() id: TransactionIdArgs) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id: id.transactionId }
    });
    return transaction;
  }

  @Query(() => [TransactionHeatmapModel])
  async getHeatmap(@UserEntity() user: User) {
    const heatmap = await this.transactionService.getHeatmap(user.id);
    return heatmap;
  }
}
