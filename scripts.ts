import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// async function createTables() {

//   const tables = new Array(15).fill(null).map(() => ({
//     isAvailable: true,
//     capacity: 4,
//   }));

//   try {
//     const result = await prisma.restaurantTable.createMany({
//       data: tables,
//     });

//     console.log(`${result.count} tables created.`);
//   } catch (error) {
//     console.error('Error creating tables:', error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// createTables();



// async function main() {
//   const newUser = await prisma.user.create({
//     data: {
//       name: 'John Doe',
//       phone: '3054206969',
//       age: 25,
//     },
//   });

//   console.log(`Created new user: ${newUser.name} (ID: ${newUser.id})`);
// }
// main()


async function main() {
  const userId = 'de9d317e-7419-4c77-ba88-81b41b8aa083';
  const dateTime = new Date('2023-10-19T20:00:00');
  const numberOfGuests = 10; // Example number of guests

  let tablesNeeded;
  let duration;

  // Your original logic for determining tables and duration
  if (numberOfGuests <= 4) {
    tablesNeeded = 1;
    duration = 1;
  } else if (numberOfGuests <= 8) {
    tablesNeeded = 2;
    duration = 2;
  } else if (numberOfGuests <= 12) {
    tablesNeeded = 3;
    duration = 3;
  } else {
    throw new Error('Cannot accommodate more than 12 guests');
  }

  // Find available tables
  const availableTables = await prisma.restaurantTable.findMany({
    where: {
      capacity: 4, // since each table has a capacity of 4
      // additional conditions like availability based on time, etc.
    },
    take: tablesNeeded, // we need this many tables
  });

  if (availableTables.length < tablesNeeded) {
    throw new Error('Not enough tables available for the number of guests.');
  }

  // Assuming your reservation schema can handle multiple tables,
  // you'd then create a reservation with these tables.
  // If not, you might need to create multiple reservations or adjust your schema.

  const newReservation = await prisma.reservation.create({
    data: {
      userId: userId,
      dateTime: dateTime.toISOString(),
      duration: duration,
      // You may need to adjust this part based on your schema.
      // This is a simplification.
      tables: availableTables.map(table => ({ id: table.id })),
      numberOfGuests: numberOfGuests,
    },
    include: {
      user: true,
      tables: true, // including table data might require a different setup
    },
  });

  console.log(`Created new reservation for ${newReservation.user.name} (ID: ${newReservation.id}) with ${tablesNeeded} tables.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
