/* eslint-disable prettier/prettier */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 1. Where to find the token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 2. Ensure the token hasn't expired
      ignoreExpiration: false,
      // 3. The secret used to sign the token in AuthModule
      secretOrKey: 'SECRET_KEY_2026', 
    });
  }

  // 4. This runs after the token is verified. 
  // The 'payload' is the decoded JSON data (sub, email, etc.)
  async validate(payload: any) {
    // This return value becomes 'req.user' in your controllers
    return { userId: payload.sub, email: payload.email };
  }
}