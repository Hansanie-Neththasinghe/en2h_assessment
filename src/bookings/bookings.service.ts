import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking, BookingStatus } from './booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { ServicesService } from '../services/services.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    private readonly servicesService: ServicesService,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    // Rule 1: A booking must belong to an existing service.
    // findOne throws NotFoundException if the service doesn't exist.
    const service = await this.servicesService.findOne(createBookingDto.serviceId);
    
    if (!service.isActive) {
      throw new BadRequestException('Cannot book an inactive service');
    }

    // Rule 2: Booking dates cannot be in the past.
    const bookingDateTime = new Date(`${createBookingDto.bookingDate}T${createBookingDto.bookingTime}:00`);
    if (bookingDateTime < new Date()) {
      throw new BadRequestException('Booking dates cannot be in the past.');
    }

    // Bonus: Prevent duplicate bookings for the same service, date, and time
    const duplicate = await this.bookingRepository.findOneBy({
      serviceId: createBookingDto.serviceId,
      bookingDate: createBookingDto.bookingDate,
      bookingTime: createBookingDto.bookingTime,
    });
    
    if (duplicate) {
      throw new ConflictException('This time slot is already booked for this service.');
    }

    const booking = this.bookingRepository.create(createBookingDto);
    return this.bookingRepository.save(booking);
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingRepository.find({ relations: { service: true } });
  }

  async findOne(id: string): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: { service: true },
    });
    
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return booking;
  }

  async updateStatus(id: string, updateBookingStatusDto: UpdateBookingStatusDto): Promise<Booking> {
    const booking = await this.findOne(id);

    // Rule 3: Cancelled bookings cannot be marked as completed.
    if (booking.status === BookingStatus.CANCELLED && updateBookingStatusDto.status === BookingStatus.COMPLETED) {
      throw new BadRequestException('Cancelled bookings cannot be marked as completed.');
    }

    booking.status = updateBookingStatusDto.status;
    return this.bookingRepository.save(booking);
  }

  async cancel(id: string): Promise<Booking> {
    const booking = await this.findOne(id);
    booking.status = BookingStatus.CANCELLED;
    return this.bookingRepository.save(booking);
  }
}
