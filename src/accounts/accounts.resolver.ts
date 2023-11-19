import { UseGuards } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { PrismaService } from "nestjs-prisma";
import { GqlAuthGuard } from "../auth/gql-auth.guard";
import { UserEntity } from "../common/decorators/user.decorator";
import { User } from "../users/models/user.model";
import { AccountsService } from "./accounts.service";
import { AccountHistoryInput } from "./dto/accountHistory.input";
import { Account } from "./models/account.model";
import { AccountBalanceModel } from "./models/accountBalance.model";
import { AccountHistoryModel } from "./models/accountHistory.model";

@Resolver(() => Account)
@UseGuards(GqlAuthGuard)
export class AccountsResolver {
  constructor(
    private prisma: PrismaService,
    private accountService: AccountsService
  ) {}

  @Query(() => [AccountBalanceModel])
  async getUserAccounts(@UserEntity() user: User) {
    const accounts = await this.accountService.getAccountBalances(user.id);
    return accounts;
  }

  @Query(() => [AccountHistoryModel])
  async getAccountHistory(
    @Args("data") { accountId, timePeriod }: AccountHistoryInput
  ) {
    const history = await this.accountService.getAccountHistory(
      accountId,
      timePeriod
    );
    return history;
  }
}
