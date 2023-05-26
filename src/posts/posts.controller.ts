import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { MarkResponseInterface } from './response/mark-response.interface';
import { UpdateResult } from 'typeorm';
import { HasRoles } from 'src/auth/decorators/has-roles.decorator';
import { Role } from 'src/user/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/strategy/roles.guard';


@Controller('posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService
    ) { }


    //ADD NEW MARK
    @HasRoles(Role.Admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Post("/mark/:name")
    async addNewMark(
        @Param("name") name: string
    ): Promise<MarkResponseInterface> {
        return await this.postsService.addNewMark(name);
    }


    //GET ALL MARKS
    @HasRoles(Role.Admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get("/mark/all")
    async getAllMarks(): Promise<MarkResponseInterface[]> {
        return await this.postsService.getAllMarks();
    }

    //DELETE MARK 
    @HasRoles(Role.Admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Delete("/mark/delete/:name")
    async deleteMark(
        @Param("name") name: string
    ): Promise<UpdateResult> {
        return await this.postsService.deleteMark(name);
    }

    //RESTORE MARK
    @HasRoles(Role.Admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Post("/mark/resotre/:name")
    async restoreMark(
        @Param("name") name: string
    ): Promise<MarkResponseInterface> {
        return await this.postsService.restoreMark(name);
    }
}
