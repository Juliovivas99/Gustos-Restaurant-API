import express from 'express';
import {
    createReservation,
    getAllReservations,
    getReservationById,
    deleteReservation
} from './../controllers/reservationController';

const router = express.Router();

router.post('/', createReservation);
router.get('/', getAllReservations);
router.get('/:id', getReservationById);
router.delete('/:id', deleteReservation);

export default router;
