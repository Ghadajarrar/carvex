// src/cars/cars.controller.ts
import { Controller, Get, Post, Body, Delete, Param, Patch, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CarsService } from './cars.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('admin/cars')
export class CarsController {
  constructor(private service: CarsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  // Nouveau : récupérer une voiture par ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  create(@UploadedFile() image: Express.Multer.File, @Body() body: any) {
    return this.service.create({ ...body, image: image.filename });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
