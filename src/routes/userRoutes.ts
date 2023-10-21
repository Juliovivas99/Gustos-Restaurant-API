import express from 'express';
import {
    createUser,
    getAllUsers,
    getUserById,
    deleteUser
} from './../controllers/userController';

const router = express.Router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUser);

export default router;
