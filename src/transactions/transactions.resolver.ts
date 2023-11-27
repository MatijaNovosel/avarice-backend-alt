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
import { Pagination } from "./dto/pagination.input";
import { PostOrder } from "./dto/post-order.input";
import { TransactionConnection } from "./models/transaction-connection.model";
import { Transaction } from "./models/transaction.model";

const pubSub = new PubSub();

@Resolver(() => Transaction)
@UseGuards(GqlAuthGuard)
export class TransactionsResolver {
  constructor(private prisma: PrismaService) {}

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
  async duplicateTransaction(@Args("data") { id }: DuplicateTransactionInput) {
    const transaction = await this.prisma.transaction.findFirst({
      where: {
        id
      }
    });

    const newTransaction = await this.prisma.transaction.create({
      data: {
        accountId: transaction.accountId,
        amount: transaction.amount,
        description: transaction.description,
        latitude: transaction.latitude,
        longitude: transaction.longitude,
        categoryId: transaction.categoryId
      }
    });

    return newTransaction.id;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Transaction)
  async createTransaction(@Args("data") data: CreateTransactionInput) {
    const newTransaction = await this.prisma.transaction.create({
      data: {
        accountId: data.accountId,
        amount: data.amount,
        description: data.description,
        latitude: 0,
        longitude: 0,
        categoryId: data.categoryId
      }
    });

    if (data.saveAsTemplate) {
      await this.prisma.template.create({
        data: {
          accountId: data.accountId,
          amount: data.amount,
          description: data.description,
          latitude: 0,
          longitude: 0,
          categoryId: data.categoryId
        }
      });
    }

    pubSub.publish("transactionCreated", {
      transactionCreated: newTransaction
    });

    return newTransaction;
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
    return this.prisma.transaction.findUnique({
      where: { id: id.transactionId }
    });
  }
}
