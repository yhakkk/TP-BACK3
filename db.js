import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const conectarBD = async () => {
  try {
    await mongoose.connect(process.env.BD_OTP, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // Aumenta el tiempo de espera de selección de servidor
    });
    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
    process.exit(1); // Termina la aplicación si no hay conexión
  }
};

export default conectarBD;
