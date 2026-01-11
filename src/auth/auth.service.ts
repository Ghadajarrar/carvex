import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Validate credentials
  async validateUser(email: string, pass: string) {
    if (!email || !pass) return null;

    const user = await this.usersService.findByEmail(email);
    if (!user) return null;

    const match = await bcrypt.compare(pass, user.password);
    if (!match) return null;

    // Remove password from result
    const { password, ...result } = user.toObject();

    // Ensure optional fields exist for frontend
    return {
      ...result,
      avatar: result.avatar || null,
      phone: result.phone || '',
      reservations: result.reservations || [],
    };
  }

 async login(user: any) {
 const payload = {
  sub: user._id,
  role: user.role,
  name: user.name,
  email: user.email,
  phone: user.phone,
};


  return {
    access_token: this.jwtService.sign(payload),
    user: {
      _id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
      phone: user.phone || '',
      avatar: user.avatar || '',        // add this
      favorites: user.favorites || [],  // add this
      reservations: user.reservations || [], // add this
    },
  };
}


  // Register new CLIENT user
  async register(data: any) {
  if (!data) throw new BadRequestException('Body is missing');
  if (!data.password) throw new BadRequestException('Password is required');

  // Vérifier si l'email existe déjà
  const existingUser = await this.usersService.findByEmail(data.email);
  if (existingUser) {
    throw new BadRequestException('Email already exists'); // <- ici on renvoie un 400
  }

  const hashed = await bcrypt.hash(data.password, 10);

  const user = await this.usersService.create({
    name: data.name,
    email: data.email,
    phone: data.phone || '',
    password: hashed,
    role: 'CLIENT',
    avatar: null,
    reservations: [],
  });

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone || '',
    avatar: user.avatar || null,
    reservations: [],
    role: user.role,
  };
}

}
