import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ServicesService } from './services.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  // Anyone can see all services
  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  // Anyone can see a single service
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }

  // Admin only: create
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() body: any) {
    return this.servicesService.create(body);
  }

  // Admin only: update
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.servicesService.update(id, body);
  }

  // Admin only: delete
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(id);
  }
}
