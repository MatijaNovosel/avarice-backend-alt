import { UseGuards } from "@nestjs/common";
import { Mutation, Resolver } from "@nestjs/graphql";
import { PrismaService } from "nestjs-prisma";
import { GqlAuthGuard } from "src/auth/gql-auth.guard";
import { UserEntity } from "src/common/decorators/user.decorator";
import { User } from "src/users/models/user.model";
import { Template } from "./models/template.model";

@Resolver(() => Template)
@UseGuards(GqlAuthGuard)
export class TransactionsResolver {
  constructor(private prisma: PrismaService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => [Template])
  async getUserTemplates(@UserEntity() user: User) {
    const templates = await this.prisma.template.findMany({
      where: {
        account: {
          userId: user.id
        }
      }
    });
    return templates;
  }
}
