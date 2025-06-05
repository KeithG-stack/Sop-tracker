const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: 'Safety' },
      update: {},
      create: {
        name: 'Safety',
        description: 'Safety procedures and protocols',
        color: '#ff4444',
      },
    }),
    prisma.category.upsert({
      where: { name: 'Operations' },
      update: {},
      create: {
        name: 'Operations',
        description: 'Daily operational procedures',
        color: '#44ff44',
      },
    }),
    prisma.category.upsert({
      where: { name: 'Quality Control' },
      update: {},
      create: {
        name: 'Quality Control',
        description: 'Quality assurance procedures',
        color: '#4444ff',
      },
    }),
  ]);

  // Create sample SOP
  const sampleSOP = await prisma.sOP.create({
    data: {
      title: 'Sample Safety Procedure',
      content: 'This is a sample SOP for safety procedures...',
      version: '1.0',
      status: 'PUBLISHED',
      authorId: admin.id,
      categoryId: categories[0].id,
    },
  });

  console.log('Database seeded successfully!');
  console.log({ admin, categories, sampleSOP });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });