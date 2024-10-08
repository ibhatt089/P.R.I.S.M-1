import { createConnection, ConnectionOptions } from 'typeorm';

export const connectDatabase = async () => {
  try {
    const connectionOptions: ConnectionOptions = {
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'PRISM_LATEST',
      entities: [__dirname + '/entities/*.{ts,js}'],
      synchronize: true
    };

    await createConnection(connectionOptions);
    console.log('Connected to the database');
  } catch (error) {
    console.error('TypeORM connection error:', error);
  }
};
