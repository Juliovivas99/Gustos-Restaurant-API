import { PrismaClient } from '@prisma/client';
import { getReservationById } from './src/controllers/reservationController';
const prisma = new PrismaClient();

// create 15 tables with capacity of 4

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


//  create new user

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


// script does not work lol

// async function createReservation() {
//   try {
//     const createdReservation = await prisma.reservation.create({
//       data: {
//         userId: 'de9d317e-7419-4c77-ba88-81b41b8aa083', // assuming your user model is set up to handle strings as IDs
//         dateTime: new Date('2023-10-21T20:00:00'),
//         numberOfGuests: 10, 
//       },
//     });

//     console.log('Created reservation:', createdReservation);
//   } catch (error) {
//     console.error('Error creating reservation:', error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// createReservation();