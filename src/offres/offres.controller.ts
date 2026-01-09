import { Controller, Get, Post, Patch, Delete, Param, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { OffersService } from './offres.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Get()
  findAll() {
    return this.offersService.findAll();
  }

  @Get('active')
  findActive() {
    return this.offersService.findActive();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offersService.findOne(id);
  }

  // POST offer with image
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads', // folder where images are saved
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = file.originalname.split('.').pop();
          cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
        },
      }),
    }),
  )
  create(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    const offerData = { ...body, image: file.filename };
    return this.offersService.create(offerData);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.offersService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.offersService.remove(id);
  }
}
