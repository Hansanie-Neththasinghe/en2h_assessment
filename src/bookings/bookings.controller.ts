import { Controller, Get, Post, Body, Patch, Param, UseGuards, Query } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { GetBookingsFilterDto } from './dto/get-bookings-filter.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  // Rule 4: Customers can create bookings without authentication
  @Post()
  @ApiOperation({ summary: 'Create a new booking (Public)' })
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }

  // All other routes require authentication
  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all bookings (with pagination, search, filter)' })
  findAll(@Query() filterDto: GetBookingsFilterDto) {
    return this.bookingsService.findAll(filterDto);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get a booking by ID' })
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(id);
  }

  @Patch(':id/status')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update booking status' })
  updateStatus(@Param('id') id: string, @Body() updateBookingStatusDto: UpdateBookingStatusDto) {
    return this.bookingsService.updateStatus(id, updateBookingStatusDto);
  }

  @Patch(':id/cancel')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Cancel a booking' })
  cancel(@Param('id') id: string) {
    return this.bookingsService.cancel(id);
  }
}
