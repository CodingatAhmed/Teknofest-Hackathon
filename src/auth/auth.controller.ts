import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ){}

    @Post('register')
    register(@Body() createUserDto: CreateUserDto) {
        return this.authService.userRegister(createUserDto);
    }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.userLogin(loginDto);
    }
}
