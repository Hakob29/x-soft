import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserResponseInterface } from './response/user-response.interface';

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
}
