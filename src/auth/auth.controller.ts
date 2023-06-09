import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserResponseInterface } from './response/user-response.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtTokenResponseInterface } from './response/jwt-response.interface';

@UseGuards()
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    //REGISTER
    @Post("/register")
    async register(@Body() dto: RegisterUserDto): Promise<UserResponseInterface> {
        return await this.authService.register(dto)
    }

    //LOGIN
    @Post("/login")
    @HttpCode(200)
    async login(
        @Body() dto: LoginUserDto
    ): Promise<JwtTokenResponseInterface> {
        return await this.authService.login(dto);
    }
}