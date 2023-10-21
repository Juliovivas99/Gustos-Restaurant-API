import axios from 'axios';

async function createReservation() {
  try {
    const response = await axios.post('http://localhost:3000/reservations', {
      userId: 'de9d317e-7419-4c77-ba88-81b41b8aa083', 
      dateTime: '2023-10-21T20:00:00',
      numberOfGuests: 10,
    });

    console.log('Created reservation:', response.data);
  } catch (error: any) {
    console.error('Error creating reservation:', error.message);
  }
}

createReservation();
