import { Body, Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponseInterface } from './response/user-response.interface';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorators';
import { User } from './user.entity';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateResult } from 'typeorm';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    //FIND USER BY EMAIL
    @Get("/:email")
    async findByEmail(
        @Param("email") email: string
    ): Promise<UserResponseInterface> {
        return await this.userService.findByEmail(email);
    }

    //UPDATE USER
    @UseGuards(AuthGuard("jwt"))
    @Put("/update")
    async updateUser(
        @Body() dto: UpdateUserDto,
        @CurrentUser() currentUser: User
    ): Promise<UserResponseInterface> {
        return await this.userService.updateUser(dto, currentUser);
    }

    //DELETE USER
    @UseGuards(AuthGuard("jwt"))
    @Delete("/delete")
    async deleteUser(
        @Body() dto: DeleteUserDto,
        @CurrentUser() currentUser: User
    ): Promise<UpdateResult> {
        return await this.userService.deleteUser(dto, currentUser)
    }
}
