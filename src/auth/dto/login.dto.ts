import { IsEmail,IsNotEmpty,MinLength } from 'class-validator';
export class LoginDto {
    @IsNotEmpty()
    @IsEmail({}, { message: 'Please enter a correct email' })
    email: string;
    @IsNotEmpty()
    @MinLength(6, { message: 'Password must be at least 6 characters' })
    password: string;
}