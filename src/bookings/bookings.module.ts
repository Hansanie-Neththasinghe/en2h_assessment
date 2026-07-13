import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { Booking } from './booking.entity';
import { ServicesModule } from '../services/services.module'; // Import ServicesModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking]),
    ServicesModule, // Inject ServicesService to check if service exists
  ],
  controllers: [BookingsController],
  providers: [BookingsService]
})
export class BookingsModule {}
