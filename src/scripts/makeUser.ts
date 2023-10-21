import axios from 'axios';

async function createUser() {
  try {
    const response = await axios.post('http://localhost:3000/users', {
      name: 'George Washington',
      phone: '123-456-7890',
      age: 30,
    });

    console.log('Created user:', response.data);
  } catch (error: any) {
    console.error('Error creating user:', error.message);
  }
}

createUser();
