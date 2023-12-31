import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createReservation = async (req: Request, res: Response) => {
    const { userId, dateTime, numberOfGuests } = req.body;

    let tablesNeeded: number;
    let duration: number;

    if (numberOfGuests <= 4) {
        tablesNeeded = 1;
        duration = 1;
    } else if (numberOfGuests >= 5 && numberOfGuests <= 8) {
        tablesNeeded = 2;
        duration = 2;
    } else if (numberOfGuests >=9 && numberOfGuests <= 12) {
        tablesNeeded = 3;
        duration = 3;
    } else {
        return res.status(400).json({ error: 'Cannot accommodate more than 12 guests' });
    }

    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const startTime = new Date(dateTime);
        const endTime = new Date(startTime.getTime() + duration * 60 * 60 * 1000); 

        // Check table availability
        const availableTables = await prisma.restaurantTable.findMany({
            where: {
                AND: [
                    {
                        isAvailable: true,
                        reservationTables: {
                            none: {
                                OR: [
                                    { reservation: { dateTime: { gte: endTime } } },
                                    { reservation: { dateTime: { lt: startTime } } },
                                ],
                            },
                        },
                    },
                    { capacity: { gte: numberOfGuests } },
                ],
            },
            take: tablesNeeded,
        });

        if (availableTables.length < tablesNeeded) {
            return res.status(400).json({ error: 'Not enough tables available for the selected time, try a different time slot.' });
        }

        const newReservation = await prisma.reservation.create({
            data: {
                user: { connect: { id: userId } },
                dateTime: startTime,
                duration: duration,
                numberOfGuests,
            },
        });

        await Promise.all(
            availableTables.map(async (table) => {
                await prisma.reservationTable.create({
                    data: {
                        reservationId: newReservation.id,
                        tableId: table.id,
                    },
                });

                await prisma.restaurantTable.update({
                    where: { id: table.id },
                    data: { isAvailable: false },
                });
            })
        );

        if (numberOfGuests >= 6) {
            console.log("Gratuity is included.");
        }

        res.status(201).json({ message: 'Reservation created', reservation: newReservation });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const getAllReservations = async (req: Request, res: Response) => {
    try {
        const reservations = await prisma.reservation.findMany();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const getReservationById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const reservation = await prisma.reservation.findUnique({
            where: { id: parseInt(id) },
        });

        if (reservation) {
            res.status(200).json(reservation);
        } else {
            res.status(404).json({ error: 'Reservation not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteReservation = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // Check if the reservation exists and retrieve related tables
        const reservation = await prisma.reservation.findUnique({
            where: { id: parseInt(id) },
            include: {
                reservationTables: true, // Include the related tables
            },
        });
    
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
    
        // Delete the reservation
        await prisma.reservation.delete({
            where: { id: parseInt(id) },
        });
    
        // Update the status of the tables that were related to the reservation
        await Promise.all(
            reservation.reservationTables.map(async (resTable) => {
                await prisma.restaurantTable.update({
                    where: { id: resTable.tableId }, 
                    data: { isAvailable: true },
                });
            })
        );
    
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


// export const updateReservation = async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const { dateTime, numberOfGuests } = req.body;

//     try {
//         const reservation = await prisma.reservation.update({
//             where: { id: parseInt(id) },
//             data: {
//                 duration: dateTime,
//                 numberOfGuests: numberOfGuests,
//                    ??????
//             },
//         });

//         res.status(200).json(reservation);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };