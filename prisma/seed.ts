import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.category.deleteMany();
  await prisma.account.deleteMany();
  await prisma.template.deleteMany();
  await prisma.user.create({
    data: {
      email: "lisa@simpson.com",
      username: "lisa",
      firstName: "Lisa",
      lastName: "Simpson",
      password: "$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm", // secret42
      role: "USER"
    }
  });
  await prisma.user.create({
    data: {
      email: "bart@simpson.com",
      username: "bart",
      firstName: "Bart",
      lastName: "Simpson",
      role: "ADMIN",
      password: "$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm" // secret42
    }
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
