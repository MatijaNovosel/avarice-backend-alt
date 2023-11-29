import { UseGuards } from "@nestjs/common";
import { Query, Resolver } from "@nestjs/graphql";
import { PrismaService } from "nestjs-prisma";
import { GqlAuthGuard } from "../auth/gql-auth.guard";
import { UserEntity } from "../common/decorators/user.decorator";
import { User } from "../users/models/user.model";
import { Template } from "./models/template.model";

@Resolver(() => Template)
@UseGuards(GqlAuthGuard)
export class TemplatesResolver {
  constructor(private prisma: PrismaService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Template])
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
