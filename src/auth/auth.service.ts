/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { LoginDto } from './dto/login.dto'; // Create this simple DTO
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    // ... (constructor remains same)
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    /* eslint-disable prettier/prettier */
    async userRegister(createuserdto: CreateUserDto) {
        const { email, name, password } = createuserdto;
        const existingUser = await this.userService.findUserByEmail(email);

        if (existingUser) {
            throw new Error('User already exists');
        }

        // Hash the password with a salt round of 10
        const hashedPassword = await bcrypt.hash(password, 10);

        // Pass the hashed password to the user service
        const newUser = await this.userService.createUser(name, email, hashedPassword);

        const userId = (newUser as any)._id;
        const token = this.jwtService.sign({ sub: userId, email: newUser.email });

        return {
            token,
            user: { id: userId, name: newUser.name, email: newUser.email }
        };
    }

    async userLogin(loginDto: LoginDto) {
        const { email, password } = loginDto;
        const user = await this.userService.findUserByEmail(email);
        console.log(user);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const userId = (user as any)._id;
        const token = this.jwtService.sign({ sub: userId, email: user.email });

        return {
            token,
            user: { id: userId, name: user.name, email: user.email }
        };
    }
}