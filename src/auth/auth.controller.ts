import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // CLIENT registration
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  // Login (ADMIN or CLIENT)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    console.log('Login DTO received:', loginDto); // Debug
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      return { message: 'Invalid credentials' };
    }

    return this.authService.login(user);
  }

  
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }


  @Get('admin')
  adminRoute() {
    return { message: 'Admin access granted' };
  }
}
