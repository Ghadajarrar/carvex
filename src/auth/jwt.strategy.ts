import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'defaultSecret',
});

  }

async validate(payload: any) {
  console.log('JWT PAYLOAD =', payload);

  return {
    userId: payload.sub,
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
  };
}

}
