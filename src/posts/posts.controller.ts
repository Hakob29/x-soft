import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { MarkResponseInterface } from './response/mark-response.interface';
import { UpdateResult } from 'typeorm';
import { HasRoles } from 'src/auth/decorators/has-roles.decorator';
import { Role } from 'src/user/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/strategy/roles.guard';
import { AddModelDto } from './dto/add-models.dto';
import { ModelResponseInterface } from './response/model-response.interface';
import { UpdateModelDto } from './dto/update-model.dto';


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

    //_____________________MODEL_____________________//

    //ADD NEW MODEL
    @UseGuards(AuthGuard('jwt'))
    @Post("/model/add")
    async addNewModels(
        @Body() dto: AddModelDto
    ): Promise<ModelResponseInterface> {
        return await this.postsService.addNewModels(dto);
    }

    //GET MODEL BY NAME
    @Get("/model/:name")
    async getModel(@Param("name") name: string): Promise<ModelResponseInterface[]> {
        return await this.postsService.getModel(name);
    }


    //UPDATE MODEL 
    @HasRoles(Role.Admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Put("/model/update/:id")
    async updateModel(
        @Body() dto: UpdateModelDto,
        @Param("id") id: number
    ): Promise<ModelResponseInterface> {
        return await this.postsService.updateModel(dto, id)
    }

    //DELETE MODEL 
    @HasRoles(Role.Admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Delete("/model/delete/:id")
    async deleteModel(@Param("id") id: number): Promise<UpdateResult> {
        return await this.postsService.deleteModel(id);
    }

    //RESTORE DELETED MODEL
    @HasRoles(Role.Admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Post("/model/restore/:id")
    async restoreModel(@Param("id") id: number): Promise<ModelResponseInterface> {
        return await this.postsService.restoreModel(id);
    }
}
