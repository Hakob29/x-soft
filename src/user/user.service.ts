import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { UserResponseInterface } from './response/user-response.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from "bcrypt"
import { DeleteUserDto } from './dto/delete-user.dto';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';



@Injectable()
export class UserService extends TypeOrmQueryService<User> {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>
    ) {
        super(userRepo, { useSoftDelete: true })
    }


    //FIND USER BY EMAIL
    async findByEmail(email: string): Promise<UserResponseInterface> {
        try {
            const user = await this.userRepo.findOne({ where: { email: email } });
            if (!user) throw new HttpException("USER NOT FOUND", HttpStatus.NOT_FOUND);
            return {
                user: {
                    username: user.username,
                    email: user.email,
                    role: user.roles
                }
            }
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    //UPDATE USER 
    async updateUser(dto: UpdateUserDto, currentUser: User): Promise<UserResponseInterface> {
        try {
            const user = await this.userRepo.findOne({ where: { id: currentUser["sub"] } });

            if (!(user.email === dto.old_email)) throw new HttpException("WRONG EMAIL", HttpStatus.BAD_REQUEST);
            if (!(await bcrypt.compare(dto.old_password, user.password))) {
                throw new HttpException("WRONG PASSWORD", HttpStatus.BAD_REQUEST);
            }
            await this.userRepo.update(user.id, {
                username: dto.username,
                email: dto.new_email,
                password: await bcrypt.hash(dto.new_password, 10)
            });

            const newUser = await this.userRepo.findOne({ where: { id: user.id } });
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


    //DELETE USER 
    async deleteUser(dto: DeleteUserDto, currentUser: User): Promise<UpdateResult> {
        try {
            const user = await this.userRepo.findOne({ where: { id: currentUser["sub"] } });
            if (!(user.email === dto.email)) throw new HttpException("WRONG EMAIL", HttpStatus.BAD_REQUEST);
            if (!(await bcrypt.compare(dto.password, user.password))) {
                throw new HttpException("WRONG PASSWORD", HttpStatus.BAD_REQUEST);
            }
            return await this.userRepo.softDelete(user.id);
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}
