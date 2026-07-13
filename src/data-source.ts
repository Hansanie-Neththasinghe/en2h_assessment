import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { Service } from './services/service.entity';
import { Booking } from './bookings/booking.entity';

export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: 'database.sqlite',
  synchronize: false,
  logging: false,
  entities: [User, Service, Booking],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
});
