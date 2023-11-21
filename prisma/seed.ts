import { PrismaClient } from "@prisma/client";
import { PRESET_CATEGORIES } from "../src/utils/constants";

const prisma = new PrismaClient();

async function main() {
  await prisma.transaction.deleteMany();
  await prisma.template.deleteMany();
  await prisma.category.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  const user1 = await prisma.user.create({
    data: {
      email: "lisa@simpson.com",
      username: "lisa",
      firstName: "Lisa",
      lastName: "Simpson",
      password: "$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm", // secret42
      role: "USER"
    }
  });

  const user2 = await prisma.user.create({
    data: {
      email: "bart@simpson.com",
      username: "bart",
      firstName: "Bart",
      lastName: "Simpson",
      password: "$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm", // secret42
      role: "ADMIN"
    }
  });

  const account1 = await prisma.account.create({
    data: {
      currency: "EUR",
      name: "Main",
      initialBalance: 2000,
      userId: user1.id
    }
  });

  await prisma.account.create({
    data: {
      currency: "EUR",
      name: "Main",
      initialBalance: 500,
      userId: user2.id
    }
  });

  const parentCategoryIds = [];

  for (const { children, icon, name, color } of PRESET_CATEGORIES) {
    const parentCategory = await prisma.category.create({
      data: {
        name,
        userId: user1.id,
        icon,
        color,
        system: false
      }
    });
    parentCategoryIds.push(parentCategory.id);
    for (const { icon, name, color } of children) {
      await prisma.category.create({
        data: {
          name,
          userId: user1.id,
          parentId: parentCategory.id,
          icon,
          color,
          system: false
        }
      });
    }
  }

  await prisma.transaction.create({
    data: {
      createdAt: new Date("2023-11-17"),
      amount: -200,
      description: "Food 1",
      accountId: account1.id,
      categoryId: parentCategoryIds[0],
      latitude: 0,
      longitude: 0
    }
  });

  await prisma.transaction.create({
    data: {
      createdAt: new Date("2023-11-18"),
      amount: -200,
      description: "Food 2",
      accountId: account1.id,
      categoryId: parentCategoryIds[1],
      latitude: 0,
      longitude: 0
    }
  });

  await prisma.transaction.create({
    data: {
      createdAt: new Date("2023-11-19"),
      amount: 200,
      description: "Money",
      accountId: account1.id,
      categoryId: parentCategoryIds[4],
      latitude: 0,
      longitude: 0
    }
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
