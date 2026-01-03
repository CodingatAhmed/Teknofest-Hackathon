import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // Passport handles the logic; this just ensures we throw 
  // a consistent error for the frontend to catch
  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException('Please login to access this resource');
    }
    return user;
  }
}