import { PrismaClient } from "@prisma/client";
import { categories } from "../src/data/projectCategories";

const prisma = new PrismaClient();

async function main() {
  const allProjects = categories.flatMap((cat) => cat.projects);

  for (const project of allProjects) {
    await prisma.dojo.upsert({
      where: { id: project.id },
      update: {
        title: project.name,
        description: project.description,
        price: project.price * 100, // store in paise
        thumbnail: project.image,
      },
      create: {
        id: project.id,
        title: project.name,
        description: project.description,
        price: project.price * 100, // store in paise
        thumbnail: project.image,
      },
    });
  }

  const count = await prisma.dojo.count();
  console.log(`✅ Seeded Dojos. Total count: ${count}`);
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
