
import { UsersService } from './user.service';
import { Controller, Patch, UseGuards, UploadedFile, UseInterceptors,Delete, Body, Req ,Get, Param,} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: any) {
    return this.service.update(id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

 @Patch('me/avatar')
@UseInterceptors(FileInterceptor('avatar', {
  storage: diskStorage({
    destination: './uploads/avatars',
    filename: (_, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + extname(file.originalname));
    }
  }),
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 Mo max
}))
async updateAvatar(@UploadedFile() file: Express.Multer.File, @Req() req: any) {
  if (!file) return { message: 'Avatar manquant' };

  const avatarUrl = `/uploads/avatars/${file.filename}`;

  // req.user est l'objet complet retourné par JwtStrategy
  const updatedUser = await this.service.update(req.user._id, { avatar: avatarUrl });

  return updatedUser;
}


}
