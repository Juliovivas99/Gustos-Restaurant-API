import express from 'express';
import reservationRoutes from './routes/reservationRoutes'; 
import userRoutes from './routes/userRoutes'

const app = express();
app.use(express.json());

const PORT = 3000;

// Root URL handler
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Gustos, where anyone can cook! ... even a rat',
    routes: {
      reservations: '/reservations',
      users: '/users'
    }
  });
});

app.use('/reservations', reservationRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
