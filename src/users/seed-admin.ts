import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from './user.service';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  // Check if admin already exists
  const existing = await usersService.findByEmail('azer.gloulou@carvex.com');
  if (existing) {
    console.log('Admin already exists');
    await app.close();
    return;
  }

  const hashedPassword = await bcrypt.hash('carvex2025', 10);

  await usersService.create({
    name: 'Azer gloulou',
    email: 'azer.gloulou@carvex.com',
    password: hashedPassword,
    role: 'ADMIN',
  });

  console.log('Admin created successfully!');
  await app.close();
}

bootstrap();
