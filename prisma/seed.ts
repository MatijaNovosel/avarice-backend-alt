import { PrismaClient } from "@prisma/client";

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
  const foodAndDrinksParentCategory = await prisma.category.create({
    data: {
      name: "Food & drinks",
      userId: user1.id,
      icon: "mdi-food-fork-drink",
      color: "#ff3300",
      system: false
    }
  });
  const restaurantFastFoodCategory = await prisma.category.create({
    data: {
      name: "Restaurant, fast-food",
      userId: user1.id,
      icon: "mdi-food",
      color: "#ff3300",
      system: false,
      parentId: foodAndDrinksParentCategory.id
    }
  });
  await prisma.transaction.create({
    data: {
      amount: 200,
      description: "Food",
      accountId: account1.id,
      categoryId: restaurantFastFoodCategory.id,
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
