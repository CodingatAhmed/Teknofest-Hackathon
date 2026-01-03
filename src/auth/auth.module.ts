/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from '../user/schema/user.schema'; // Adjust path
import { UserService } from '../user/user.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    // 1. Register the JwtModule
    JwtModule.register({
      secret: 'SECRET_KEY_2026', // Use a simple string for the challenge
      signOptions: { expiresIn: '1h' },
    }),
    // 2. Ensure User Model is available for the UserService inside Auth
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [AuthService, UserService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}