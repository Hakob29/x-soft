import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from "bcrypt"
import { UserResponseInterface } from './response/user-response.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>
    ) { }

    //REGISTER
    async register(dto: RegisterUserDto): Promise<UserResponseInterface> {
        try {
            const newUser = await this.userRepo.create({
                ...dto,
                password: await bcrypt.hash(dto.password, 10)
            });
            await this.userRepo.save(newUser);
            return {
                user: {
                    username: newUser.username,
                    email: newUser.email
                }
            }
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}
