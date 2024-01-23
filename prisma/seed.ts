// import { prisma } from '../src/utils/prisma';
const prisma = new PrismaClient();
import { PrismaClient } from '@prisma/client';
import words from './data.json';

async function main() {
  for (const word of words) {
    await prisma.word.upsert({
      where: { name: word.name },
      update: word,
      create: word,
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
