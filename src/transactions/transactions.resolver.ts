import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";
import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
import { PrismaService } from "nestjs-prisma";
import { GqlAuthGuard } from "../auth/gql-auth.guard";
import { UserEntity } from "../common/decorators/user.decorator";
import { PaginationArgs } from "../common/pagination/pagination.args";
import { User } from "../users/models/user.model";
import { TransactionIdArgs } from "./args/post-id.args";
import { CreatePostInput } from "./dto/createPost.input";
import { PostOrder } from "./dto/post-order.input";
import { PostConnection } from "./models/transaction-connection.model";
import { Transaction } from "./models/transaction.model";

const pubSub = new PubSub();

@Resolver(() => Transaction)
export class TransactionsResolver {
  constructor(private prisma: PrismaService) {}

  @Subscription(() => Transaction)
  postCreated() {
    return pubSub.asyncIterator("postCreated");
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Transaction)
  async createPost(@Args("data") data: CreatePostInput) {
    const newPost = this.prisma.transaction.create({
      data: {
        description: data.title,
        amount: 200,
        latitude: 1,
        longitude: 2,
        accountId: "",
        categoryId: ""
      }
    });
    pubSub.publish("postCreated", { postCreated: newPost });
    return newPost;
  }

  @Query(() => PostConnection)
  async getTransactions(
    @UserEntity() user: User,
    @Args() { after, before, first, last }: PaginationArgs,
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
          include: { account: true },
          where: {
            description: { contains: query || "" },
            account: {
              userId: user.id
            }
          },
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
        }),
      { first, last, before, after }
    );
    return transactions;
  }

  @Query(() => Transaction)
  async post(@Args() id: TransactionIdArgs) {
    return this.prisma.transaction.findUnique({
      where: { id: id.transactionId }
    });
  }
}
