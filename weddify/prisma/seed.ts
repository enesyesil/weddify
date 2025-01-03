const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  // Hash the password
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create a user
  const user = await prisma.user.create({
    data: {
      email: 'testuser@example.com',
      password: hashedPassword,
    },
  });

  // Create an event for the user
  const event = await prisma.event.create({
    data: {
      name: 'Wedding of Alice & Bob',
      date: new Date('2024-05-10T18:00:00.000Z'),
      location: 'Sunset Banquet Hall',
      attendees: 150,
      userId: user.id,
    },
  });

  // Add guests to the event
  await prisma.guest.createMany({
    data: [
      { firstName: 'John', lastName: 'Doe', eventId: event.id },
      { firstName: 'Jane', lastName: 'Smith', eventId: event.id },
    ],
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
