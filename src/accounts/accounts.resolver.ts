import { UseGuards } from "@nestjs/common";
import { Query, Resolver } from "@nestjs/graphql";
import { PrismaService } from "nestjs-prisma";
import { GqlAuthGuard } from "../auth/gql-auth.guard";
import { UserEntity } from "../common/decorators/user.decorator";
import { User } from "../users/models/user.model";
import { Account } from "./models/account.model";

@Resolver(() => Account)
@UseGuards(GqlAuthGuard)
export class AccountsResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [Account])
  async getUserAccounts(@UserEntity() user: User) {
    const accounts = await this.prisma.account.findMany({
      where: {
        userId: user.id
      }
    });
    return accounts;
  }
}
