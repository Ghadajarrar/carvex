import { Controller, Get, Post, Patch, Param, Body, UseGuards, Delete, Request , UnauthorizedException } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateReservationDto } from './reservation.dto';


@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  // Admin: get all reservations
  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  // Client: get own reservations
  @UseGuards(JwtAuthGuard)
  @Get('my')
  findMyReservations(@Request() req) {
    return this.reservationsService.findByUser(req.user.userId);
  }


@Post()
@UseGuards(JwtAuthGuard)
async create(@Request() req, @Body() body: CreateReservationDto) {
  if (!req.user) throw new UnauthorizedException('Utilisateur non connecté');

  const reservationData = {
    ...body,
    userId: req.user.userId,
    userName: req.user.name,
    userEmail: req.user.email,
    userPhone: req.user.phone || '',
    status: 'pending',
  };

  console.log('Envoi de la réservation avec :', reservationData);

  return this.reservationsService.create(reservationData);
}


  // Admin: update reservation status
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.reservationsService.updateStatus(id as string, status as any);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(id);
  }
}
