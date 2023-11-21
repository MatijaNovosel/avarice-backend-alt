import { UseGuards } from "@nestjs/common";
import { Query, Resolver } from "@nestjs/graphql";
import { PrismaService } from "nestjs-prisma";
import { GqlAuthGuard } from "../auth/gql-auth.guard";
import { UserEntity } from "../common/decorators/user.decorator";
import { User } from "../users/models/user.model";
import { Category } from "./models/category.model";

@Resolver(() => Category)
@UseGuards(GqlAuthGuard)
export class CategoriesResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [Category])
  async getUserCategories(@UserEntity() user: User) {
    const categories = await this.prisma.category.findMany({
      include: { parent: true },
      where: {
        userId: user.id
      }
    });
    return categories;
  }
}
