import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponseInterface } from './response/user-response.interface';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorators';
import { Role, User } from './user.entity';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateResult } from 'typeorm';
import { HasRoles } from 'src/auth/decorators/has-roles.decorator';
import { RolesGuard } from 'src/auth/strategy/roles.guard';
import { RestoreUserDto } from './dto/restore-user.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }


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


    //FIND USER BY EMAIL
    @HasRoles(Role.Admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get("/:email")
    async findByEmail(
        @Param("email") email: string
    ): Promise<UserResponseInterface> {
        return await this.userService.findByEmail(email);
    }


    //RESTORE DELETED USER
    @HasRoles(Role.Admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Post("/restore")
    async restoreUser(
        @Body() dto: RestoreUserDto
    ) {
        return await this.userService.restoreUser(dto);
    }

}
