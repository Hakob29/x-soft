import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from "bcrypt"
import { UserResponseInterface } from './response/user-response.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtTokenResponseInterface } from './response/jwt-response.interface';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        private readonly jwtService: JwtService
    ) { }

    //REGISTER
    async register(dto: RegisterUserDto): Promise<UserResponseInterface> {
        try {
            const newUser = await this.userRepo.create({
                ...dto,
                roles: dto.role,
                password: await bcrypt.hash(dto.password, 10)
            });
            await this.userRepo.save(newUser);
            return {
                user: {
                    username: newUser.username,
                    email: newUser.email,
                    role: newUser.roles
                }
            }
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    //LOGIN
    async login(dto: LoginUserDto): Promise<JwtTokenResponseInterface> {
        try {
            const user = await this.userRepo.findOne({ where: { email: dto.email } });
            if (!user) throw new HttpException("WRONG EMAIL", HttpStatus.NOT_FOUND);
            if (!(await bcrypt.compare(dto.password, user.password))) throw new UnauthorizedException()
            const payload = ({ username: user.username, sub: user.id, role: user.roles });
            return {
                access_token: this.jwtService.sign(payload)
            }
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.NOT_FOUND)
        }
    }
}
