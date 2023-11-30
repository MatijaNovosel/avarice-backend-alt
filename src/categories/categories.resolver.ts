import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { PrismaService } from "nestjs-prisma";
import { GqlAuthGuard } from "../auth/gql-auth.guard";
import { UserEntity } from "../common/decorators/user.decorator";
import { User } from "../users/models/user.model";
import { CreateCategoryInput } from "./dto/createCategory.input";
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

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async createCategory(
    @UserEntity() user: User,
    @Args("data") { color, icon, name, parentId }: CreateCategoryInput
  ) {
    const newCategory = await this.prisma.category.create({
      data: {
        color,
        icon,
        name,
        parentId,
        system: false,
        userId: user.id
      }
    });
    return newCategory.id;
  }
}
