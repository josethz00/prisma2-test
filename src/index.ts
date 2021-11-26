import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

async function main() {
  /**
   * Create a new user
   */
  await prisma.user.create({
    data: {
      name: 'José Thomaz',
      email: `${crypto.randomBytes(10).toString('utf-8')}@gmail.com`,
    },
  });

  /**
   * Retrieve all users
   */
  console.log(await prisma.user.findMany());

  /**
   * Create nested data, a user with posts linked to it
   */
  await prisma.user.create({
    data: {
      name: 'Alice e o Prisma das Maravilhas',
      email: `${crypto.randomBytes(10).toString('utf-8')}@gmail.com`,
      posts: {
        create: [
          { title: 'Prisma com TypeScript' }, 
          { title: 'Prisma com GraphQL' }, 
          { title: 'Prisma com PostgreSQL' },
        ]
      }
    }
  });

  /**
   * Retrieve all users with posts (relations - join)
   */
  console.log(
    await prisma.user.findMany({
      include: {
        posts: true,
      }
    })
  );
}

main().catch((e) => {
  throw e;
}).finally(async () => {
  await prisma.$disconnect();
});